import File from "../schemas/file.js";

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수를 정의합니다.

const getBinImages = async (req, res) => {
  const { userId, page = 0, sortKey = "date", sortOrder = "desc" } = req.query;
  console.log(
    "userId, page, sortKey, sortOrder in 휴지통 : ",
    userId,
    page,
    sortKey,
    sortOrder
  );

  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

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
    console.log("Sorted Contents in 휴지통:", sortedDocuments);

    // sortedDocuments에서 isDeleted가 true인 항목만 필터링한다.
    const filteredDocuments = sortedDocuments.filter((doc) => doc.isDeleted);

    const slicedDocuments = filteredDocuments
      .slice(startIndex, endIndex)
      .map((item, index) => {
        return {
          fileId: item._id,
          fileName: item.fileName,
          imageUrl: item.url,
        };
      });
    res.send(slicedDocuments);
  } catch (error) {
    console.error("Error fetching documents in binScrollController: ", error);
    res.status(500).send("Error fetching documents in binScrollController");
  }
};

export default getBinImages;
