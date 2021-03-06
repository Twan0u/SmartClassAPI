const EventControleur = require("../controleur/event");
const router = require("express").Router();

const authToken = require("../middleware/authToken").authToken;
const permit = require('../middleware/roleAuth').permit;

/**
 * @swagger
 * /events:
 *  get:
 *      summary: Returns all the events of class in which the user is a part of.
 *      tags:
 *          - event
 *          - teacherRole
 *          - pupilRole
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
 *              description: A JSON Array of events
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
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
router.get('/',authToken,permit("teacher","pupil"), EventControleur.getEvents);
/**
 * @swagger
 * /events/today:
 *  get:
 *      summary: Returns all events for the class for today
 *      tags:
 *          - event
 *          - teacherRole
 *          - pupilRole
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
 *              description: A JSON Array of events
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
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
router.get('/today',authToken,permit("teacher","pupil"), EventControleur.getTodayEvents);
/**
 * @swagger
 * /events/week:
 *  get:
 *      summary: Returns all events for the class for the week
 *      tags:
 *          - event
 *          - teacherRole
 *          - pupilRole
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
 *              description: A JSON Array of events
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
 *          '401':
 *              description: Auth is needed to perform this action.
 *          '403':
 *              description: The role of the user does not permit that action
 *          '498':
 *              description: The token is invalid or deprecicated
 *          '500':
 *              description: Unexpected error.
 */
router.get('/week',authToken,permit("teacher","pupil"), EventControleur.getWeekEvents);

/**
 * @swagger
 *  components:
 *   schemas:
 *      EventInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  format: CHAR(255)
 *              description:
 *                  type: string
 *                  format: CHAR(255)
 *              date:
 *                  type: string
 *                  format: 'DDD MMM YYY'
 *          example:
 *              name: 'Sortie scolaire'
 *              description: 'sortie au musée (ne pas oublier son masque)'
 *              date: '2020-12-24'
 *          required:
 *              - name
 *              - date
 */

/**
 * @swagger
 * /events:
 *  post:
 *      summary: add a new event
 *      tags:
 *          - teacherRole
 *          - event
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
 *          description: the event to add
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EventInput'
 *      responses:
 *          '201':
 *              description: Object has been added
 *          '400':
 *              description: body of request incomplete or wrong
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
router.post('/',authToken,permit("teacher"), EventControleur.postEvent);

/**
 * @swagger
 * /events/id/update:
 *  post:
 *      summary: modify an event
 *      tags:
 *          - event
 *          - teacherRole
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
 *          description: the event to add in db
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EventInput'
 *      responses:
 *          '200':
 *              description: Object has been added
 *          '400':
 *              description: body of request invalid or id in url path not valid
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
router.post('/:id/update',authToken,permit("teacher"), EventControleur.updateEvent);
/**
 * @swagger
 * /events/id/delete:
 *  get:
 *      summary: Delete an event
 *      tags:
 *          - event
 *          - teacherRole
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
 *              description: Object has been deleted
 *          '400':
 *              description: id in url path not valid
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
router.get('/:id/delete',authToken,permit("teacher"), EventControleur.deleteEvent);

module.exports = router;