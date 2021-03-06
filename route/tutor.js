const TutorController = require("../controleur/tutor");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;
/**
 * @swagger
 * /tutor/pupils:
 *  get:
 *      summary: Returns all the pupils of a tutor (with tokens)
 *      tags:
 *          - tutorRole
 *      security:
 *          - bearerAuth: []
 *          # permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      responses:
 *          '200':
 *              description: A JSON Array of pupils
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  firstname:
 *                                      type: string
 *                                  lastname:
 *                                      type: string
 *                                  token:
 *                                      type: string
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 */
router.get('/pupils',authToken,permit("tutor"), TutorController.getPupils);


/**
 * @swagger
 * /add/pupil:
 *  post:
 *      summary: Add a pupil in the list of pupils that a tutor have
 *      tags:
 *          - tutorRole
 *      security:
 *          - bearerAuth: []
 *          # permit todo
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *            format: JWT
 *          required: true
 *      requestBody:
 *          description: the pupil that need to be added
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              format: CHAR(255)
 *                          password:
 *                              type: string
 *                              format: CHAR(255)
 *      responses:
 *          '200':
 *              description: relation has been added
 *          '400':
 *              description: body of request is invalid
 *          '401':
 *              description: Auth is needed to perform this action. OR pupil user/password is wrong
 *          '403':
 *              description: The role of the user does not permit that action
 *          '404':
 *              description: pupil not found
 *          '409':
 *              description: the pupil is already linked to this tutor
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 *
 *
 */
router.post('/add/pupil',authToken,permit("tutor"), TutorController.addPupil);

module.exports = router;