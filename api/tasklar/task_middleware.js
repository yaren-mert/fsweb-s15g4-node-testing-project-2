const gorevModel = require("../gorevler/gorev_model");
const taskModel = require("../tasklar/task_model");

const checkTaskFields = async function (req, res, next) {
  try {
    let { Adi } = req.body;
    if (!Adi) {
      next({
        status: 400,
        message: "Eksik Alan Var",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const checkGorevId = async function (req, res, next) {
  try {
    let { GorevId } = req.body;
    if (typeof GorevId === undefined) {
      next({
        status: 400,
        message: "Eksik Alan Var",
      });
    } else {
      let isExistGorev = await gorevModel.getById(GorevId);
      if (!isExistGorev) {
        next({
          status: 404,
          message: "Görev yok",
        });
      } else {
        req.Gorev = isExistGorev;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

const checkTaskId = async function (req, res, next) {
  try {
    let taskId = req.params.id;
    let isExistTask = await taskModel.getById(taskId);
    if (!isExistTask) {
      next({
        status: 404,
        message: "Task yok",
      });
    } else {
      req.Task = isExistTask;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkTaskFields,
  checkGorevId,
  checkTaskId,
};
