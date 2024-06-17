import File from "../schemas/file.js";
import path from "path";

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수를 정의합니다.

const getUserImages = async (req, res) => {
  const { userId, page = 0, sortKey = "date", sortOrder = "desc" } = req.query;

  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // 이름순 정렬
  try {
    let sortedDocuments = [];
    if (sortKey == "name") {
      if (sortOrder == "asc") {
        sortedDocuments = await File.find({ owner: userId }).sort({
          fileName: 1,
        });
      } else if (sortOrder == "desc") {
        sortedDocuments = await File.find({ owner: userId }).sort({
          fileName: -1,
        });
      }
    }

    if (sortKey == "date") {
      if (sortOrder == "asc") {
        sortedDocuments = await File.find({ owner: userId }).sort({
          createdAt: 1,
        });
      } else if (sortOrder == "desc") {
        sortedDocuments = await File.find({ owner: userId }).sort({
          createdAt: -1,
        });
      }
    }
    // 정렬 결과 확인
    console.log("Sorted Contents:", sortedDocuments);

    // sortedDocuments에서 isDeleted가 false인 항목만 필터링한다.
    const filteredDocuments = sortedDocuments.filter((doc) => !doc.isDeleted);

    let thumbnail = "";
    const slicedDocuments = filteredDocuments
      .slice(startIndex, endIndex)
      .map((item, index) => {
        if (
          item.type == ".jpg" ||
          item.type == ".png" ||
          item.type == ".jpeg"
        ) {
          // thumbnail = `https://instabox-source-bucket2.s3.ap-northeast-2.amazonaws.com/thumbnails/${item.fileName}`;
          thumbnail = `${process.env.HOST_ADDRESS}/api/thumbnail/${item.fileName}`;
        } else if (item.type == ".pdf") {
          thumbnail = `${process.env.HOST_ADDRESS}/api/thumbnail/pdfThumbnail.jpg`;
        } else if (item.type == ".hwp") {
          thumbnail = `${process.env.HOST_ADDRESS}/api/thumbnail/hwpThumbnail.jpg`;
        } else if (item.type == ".docx") {
          thumbnail = `${process.env.HOST_ADDRESS}/api/thumbnail/docxThumbnail.jpg`;
        } else if (item.type == ".txt") {
          thumbnail = `${process.env.HOST_ADDRESS}/api/thumbnail/txtThumbnail.jpg`;
        }
        return {
          fileId: item._id,
          fileName: item.fileName,
          imageUrl: thumbnail,
        };
      });

    console.log("Sliced+Sorted Documents: ", slicedDocuments);
    res.send(slicedDocuments);
  } catch (error) {
    console.error("Error fetching documents in mainScrollController: ", error);
    res.status(500).send("Error fetching documents in mainScrollController");
  }
};

export default getUserImages;
