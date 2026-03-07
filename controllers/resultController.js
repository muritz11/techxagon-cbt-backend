// controllers/resultController.js
import Result from "../db/resultModel.js";

export const createResults = async (req, res) => {
  try {
    const results = req.body.result;

    // validate payload is a non-empty array
    if (!Array.isArray(results) || results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Payload must be a non-empty array of results",
      });
    }

    // normalize typos from frontend before saving
    const normalized = results.map((result) => ({
      ...result,
      totalQuestions: result.totalQuestions ?? result.totalQuesions,
      questionWeight: result.questionWeight ?? result.quesionWeight,
    }));

    const saved = await Result.insertMany(normalized, { ordered: false });

    return res.status(201).json({
      success: true,
      message: `${saved.length} result(s) saved successfully`,
      data: saved,
    });
  } catch (error) {
    // insertMany with ordered:false returns a BulkWriteError
    // but still inserts valid docs — handle partial success
    if (error.name === "BulkWriteError") {
      return res.status(207).json({
        success: false,
        message: "Some results failed to save",
        inserted: error.result?.nInserted ?? 0,
        errors: error.writeErrors?.map((e) => e.errmsg),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getResults = async (req, res) => {
  try {
    const classQuery = req.query.class || req.query.className;
    const nameQuery = req.query.name;

    // base filter
    const filter = {};

    if (classQuery) filter["student.class"] = classQuery;

    // search (case-insensitive)
    if (nameQuery) {
      filter["student.name"] = { $regex: nameQuery, $options: "i" };
    }

    const [results, total] = await Promise.allSettled([
      Result.find(filter),
      Result.countDocuments(),
    ]);

    const resultsValue = results.status === "fulfilled" ? results.value : [];
    const totalValue = total.status === "fulfilled" ? total.value : 0;

    return res.status(200).json({
      success: true,
      message: "Results retrieved successfully",
      total: resultsValue.length,
      totalSubmitted: totalValue,
      data: resultsValue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
