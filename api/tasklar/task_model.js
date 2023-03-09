const db = require("../../data/db-config");

async function getAll() {
  return await db("Tasklar");
}
async function getById(taskId) {
  return await db("Tasklar").where("Id", taskId).first();
}

async function create(task) {
  let insertedTaskId = await db("Tasklar").insert(task);
  return getById(insertedTaskId);
}

async function remove(taskId) {
  await db("Tasklar").where("Id", taskId).del();
}
module.exports = {
  getAll,
  getById,
  create,
  remove,
};
