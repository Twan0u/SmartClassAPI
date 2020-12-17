/**
 * @swagger
 *  components:
 *   schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *                  format: CHAR(255)
 *              type:
 *                  type: string
 *                  format: CHAR(255)
 *              date:
 *                  type: string
 *                  format: 'DDD MMM YYY'
 *              category:
 *                  type: string
 *                  format: CHAR(255)
 *              schoolsubject:
 *                  type: string
 *                  format: CHAR(255)
 *          example:
 *              id: 18
 *              title: 'ramener argent photo de classe'
 *              date: '25 Nov 2020'
 *              category: 'Géométrie'
 *              schoolsubject: 'Mathémathiques'
 */

module.exports.getTasksByClassId = async (idClass, client) => {
    const {rows: tasks} = await client.query(`
        SELECT task.id as id,task.title as title,task.type as type, TO_CHAR(task.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM task
        LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
        LEFT JOIN SchoolSubjectCategory
        ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE idClass = $1
        `, [idClass]);
    return tasks;
}

module.exports.getCountTodayTasksByClassId = async (idClass, client) => {
    const {rows: count} = await client.query(`
        SELECT COUNT(task.id)
        FROM task
        WHERE IdClass = $1 AND date = current_date
    `, [idClass]);
    return count[0];
}

module.exports.getTodayTasksByClassId = async (idClass, client) => {
    const {rows: tasks} = await client.query(`
        SELECT task.id as id,task.title as title,task.type as type, TO_CHAR(task.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM task
        LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
        LEFT JOIN SchoolSubjectCategory
        ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE IdClass = $1
            and date = current_date
    `, [idClass]);
    return tasks;
}

module.exports.getWeekTasksByClassId = async (idClass, client) => {
    const {rows: tasks} = await client.query(`

        SELECT task.id as id, task.title as title, task.type as type, TO_CHAR(task.date, 'DD Mon YYYY') as date, SchoolSubjectSubCategory.name as category, SchoolSubjectCategory.name as schoolsubject
        FROM task
        LEFT JOIN SchoolSubjectSubCategory
        ON SchoolSubjectSubCategory.id = task.idSchoolSubjectSubCategory
        LEFT JOIN SchoolSubjectCategory
        ON SchoolSubjectCategory.id = SchoolSubjectSubCategory.IdSchoolSubjectCategory
        WHERE IdClass = $1
            and (date between current_date  and (current_date  '1 week':: interval))
    
    `, [idClass]);

    return tasks;
}

module.exports.postTask = async (title,type,date,idSubCat, idClass,client) => {
    const {rows: id} = await client.query(`
        INSERT INTO Task(title,type, date, idSchoolSubjectSubCategory, idClass)
        VALUES($1,$2,$3,$4,$5)
        RETURNING id;`, [title,type,date,idSubCat,idClass]);
    return id;
}

module.exports.updateTask = async (id,title,type,date,idSubCat,client) => {
    return await client.query(`
        UPDATE Task
        SET title = $2, type = $3, date = $4, idSchoolSubjectSubCategory = $5
        WHERE id = $1`, [id,title,type,date,idSubCat]);
}

module.exports.deleteTask = async (id,client) => {
    return await client.query("DELETE FROM Task WHERE id=$1", [id]);
}

