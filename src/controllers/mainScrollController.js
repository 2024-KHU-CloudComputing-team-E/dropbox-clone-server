import File from "../schemas/file.js";

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수를 정의합니다.

const getUserImages = async (req, res) => {
  const { userId, page = 0, sortKey = "date", sortOrder = "desc" } = req.query;
  console.log("userId, page, sortKey, sortOrder");

  let sortedDocuments = [];

  // 이름순 정렬
  try {
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

    //페이지네이션 함수 추가 필요
    const slicedDocuments = await pagination(filteredDocuments, page);
    res.send(slicedDocuments);
  } catch (error) {
    console.error("Error fetching documents in mainScrollController: ", error);
    res.status(500).send("Error fetching documents in mainScrollController");
  }
};

async function pagination(filteredDocuments, page) {
  try {
    // 페이지네이션을 위해 시작 인덱스와 끝 인덱스를 계산합니다.
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const slicedDocuments = filteredDocuments
      .slice(startIndex, endIndex)
      .map((item, index) => {
        return {
          fileId: item._id,
          fileName: item.fileName,
          imageUrl: item.url,
        };
      });

    console.log("Sliced+Sorted Documents: ", slicedDocuments);
    return slicedDocuments;
  } catch (error) {
    console.error("페이지네이션 오류");
  }
}

export default getUserImages;
