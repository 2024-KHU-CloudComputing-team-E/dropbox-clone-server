import AWS from 'aws-sdk'; // AWS SDK 모듈을 불러옵니다.
import connectDB from "../config/mongoClient.js";
import dotenv from 'dotenv';

dotenv.config();

const ID = process.env.S3_ACCESSKEYID;
const SECRET = process.env.S3_SECRETACCESSKEY;
const BUCKET_NAME = process.env.S3_BUCKETNAME;

const d_s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET });

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수를 정의합니다.

const db = await connectDB();
const collection = db.collection("files");

const getBinImages = async (req, res) => {
    const { userId, page = 0, sortKey = 'date', sortOrder = 'desc' } = req.query;

    try {
        const params = {
            Bucket: BUCKET_NAME, // 환경 변수에서 가져온 S3 버킷 이름을 지정합니다.
        };

        // S3에서 객체 목록을 가져옵니다.
        const data = await d_s3.listObjectsV2(params).promise();
        console.log("S3 Data:", data);

        let sortedContents = [];

        // 이름순 정렬
        if(sortKey == 'name'){
            if(sortOrder == 'asc'){
                sortedContents = data.Contents.sort((a, b) => a.Key.localeCompare(b.Key));
            }
            else if(sortOrder == 'desc'){
                sortedContents = data.Contents.sort((a, b) => b.Key.localeCompare(a.Key));
            }
        }
        
        // 날짜순 정렬
        if(sortKey == 'date'){
            if(sortOrder == 'asc'){
                sortedContents = data.Contents.sort((a, b) => new Date(a.LastModified) - new Date(b.LastModified));
            }
            else if(sortOrder == 'desc'){
                sortedContents = data.Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
            }
        }

        //정렬 결과 확인
        console.log("Sorted Contents:", sortedContents);

        // MongoDB에서 filename에 해당하는 항목을 조회하고, isDeleted가 false인 항목만 필터링합니다.
        // isDeleted false -> true로 수정
        const filenames = sortedContents.map(item => item.Key);
        console.log(filenames);
        const files = await collection.find({ filename: { $in: filenames }, owner: userId, isDeleted: true }).project({ filename: 1 }).toArray();
        console.log("MongoDB Files:", files);

        // MongoDB에서 가져온 파일 목록을 기준으로 S3 객체 목록을 필터링합니다.
        const validFilenames = files.map(file => file.filename);
        console.log("Valid Filenames:", validFilenames);
        const filteredContents = sortedContents.filter(item => validFilenames.includes(item.Key));
        console.log("Filtered Contents:", filteredContents);

        // 페이지네이션을 위해 시작 인덱스와 끝 인덱스를 계산합니다.
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // 필터링된 객체 목록에서 URL과 기타 정보를 생성합니다.
        const images = filteredContents.slice(startIndex, endIndex).map((item, index) => {
            return {
                fileId: page*10 + index,
                // filename은 객체의 키로 설정합니다.
                filename: item.Key, 
                imgUrl: d_s3.getSignedUrl('getObject', {
                    Bucket: params.Bucket,
                    Key: item.Key,
                    // URL의 유효 기간을 60초로 설정합니다.
                    Expires: 60 
                })
            };
        });
        console.log("Images:", images);

        // 클라이언트에 이미지 객체 목록을 JSON 형식으로 응답합니다.
        res.json({ images });
    } catch (error) {
        console.error("Error fetching images from S3:", error);
        res.status(500).send('Error fetching images from S3');
    }
};

export default getBinImages;