const bio = {
    insert: 'INSERT INTO scene_bio_evidence(' +
        '`element_manager`, `element_remark`, `element_image`, `create_date`, `localname`, ' +
        '`ID`, `SERIAL_NO`, `scene_id`, `CREATE_USER_ID`, `INVESTIGATION_ID`, `EVIDENCE_PHOTO_ID`, ' +
        '`EVIDENCE_TYPE`, `DESCRIPTION`, `COLLECTED_BY_NAME`, `LEFT_POSITION`, `COLLECTION_MODE`, ' +
        '`COLLECTED_DATE`, `UTILIZATION`, `MATCH_PERSON_ID`, `INSPECT_RESULT`, `MATCH_PERSON_NAME`, ' +
        '`CRIMINAL_FLAG`, `STORAGE_FLAG`, `PRINT_FLAG`)' +
        ' VALUES (NULL, NULL, NULL, NULL, NULL,?,?,?,"",NULL,NULL,?,?,?,?,?,?,?,NULL,NULL,NULL,?,?,?)',
    updateInfo:
        'UPDATE scene_bio_evidence SET EVIDENCE_TYPE = ?,DESCRIPTION = ?,COLLECTED_BY_NAME = ?,' +
        'LEFT_POSITION = ?, COLLECTION_MODE = ?, COLLECTED_DATE = ?, UTILIZATION = ?, ' +
        'CRIMINAL_FLAG = ? WHERE ID = ?',
    queryAll: 'SELECT * FROM scene_bio_evidence LIMIT 10',
    // SELECT * FROM (SELECT * FROM scene_bio_evidence WHERE ID = 10) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;
    // queryById: 'SELECT * FROM scene_bio_evidence WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_bio_evidence WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
const elec = {
    insert: 'INSERT INTO scene_elec_evidence(' +
        '`element_manager`, `element_remark`, `element_image`, `create_date`, `localname`, ' +
        '`ID`, `SERIAL_NO`, `CREATE_USER_ID`, `INVESTIGATION_ID`, `EVIDENCE_PHOTO_ID`, ' +
        '`EVIDENCE_TYPE`, `DESCRIPTION`, `LEFT_POSITION`, `COLLECTION_MODE`, ' +
        '`COLLECTED_BY_NAME`, `COLLECTED_DATE`, `UTILIZATION`, `scene_id`)' +
        'VALUES (NULL, NULL, NULL, NULL, NULL,?,?,NULL,?,NULL,?,?,?,?,?,?,?,NULL)',
    queryAll: 'SELECT * FROM scene_elec_evidence LIMIT 10',
    updateInfo: 'UPDATE scene_elec_evidence SET EVIDENCE_TYPE = ?,DESCRIPTION = ?,LEFT_POSITION = ?,' +
        'COLLECTION_MODE = ?, COLLECTED_BY_NAME = ?, COLLECTED_DATE = ?, UTILIZATION = ?,CRIMINAL_FLAG=? WHERE ID = ?',
   // queryById: 'SELECT * FROM scene_elec_evidence WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_elec_evidence WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
const file = {
    insert: 'INSERT INTO scene_file_evidence(' +
        '`element_manager`, `element_remark`, `element_image`, `create_date`, `localname`, ' +
        '`ID`, `SERIAL_NO`, `CREATE_USER_ID`, `INVESTIGATION_ID`, `EVIDENCE_PHOTO_ID`, ' +
        '`EVIDENCE_TYPE`, `DESCRIPTION`, `LEFT_POSITION`, `COLLECTION_MODE`, ' +
        '`COLLECTED_BY_NAME`, `COLLECTED_DATE`,`PRINT_FLAG`, `UTILIZATION`, `scene_id`,`CRIMINAL_FLAG`)' +
        'VALUES (NULL, NULL, NULL, NULL, NULL,?,?,NULL,?,NULL,?,?,?,?,?,?,?,?,NULL,NULL)',
    queryAll: 'SELECT * FROM scene_file_evidence LIMIT 10',
    updateInfo: 'UPDATE scene_file_evidence SET EVIDENCE_TYPE = ?,DESCRIPTION = ?,LEFT_POSITION = ?,' +
        'COLLECTION_MODE = ?, COLLECTED_BY_NAME = ?, COLLECTED_DATE = ?, UTILIZATION = ?,CRIMINAL_FLAG=? WHERE ID = ?',
    // queryById: 'SELECT * FROM scene_file_evidence WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_elec_evidence WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
const foot = {
    insert: 'INSERT INTO scene_footprint(' +
        '`element_manager`, `element_remark`, `element_image`, `create_date`, `localname`, ' +
        '`ID`, `SERIAL_NO`, `CREATE_USER_ID`, `INVESTIGATION_ID`, `EVIDENCE_PHOTO_ID`, ' +
        '`EVIDENCE_TYPE`, `DESCRIPTION`, `LEFT_POSITION`, `COLLECTION_MODE`, ' +
        '`COLLECTED_BY_NAME`, `COLLECTED_DATE`,`PRINT_FLAG`, `UTILIZATION`, `scene_id`,`CRIMINAL_FLAG`)' +
        'VALUES (NULL, NULL, NULL, NULL, NULL,?,?,NULL,?,NULL,?,?,?,?,?,?,?,?,NULL,NULL)',
    queryAll: 'SELECT * FROM scene_footprint LIMIT 10',
    updateInfo: 'UPDATE scene_footprint SET PRINT_TYPE = ?,PRINT_CODE=?,LEFT_POSITION = ?,COLLECTION_MODE = ?,' +
        'COLLECTED_BY_NAME = ?, COLLECTED_DATE = ?, UTILIZATION = ?, CRIMINAL_FLAG = ? WHERE ID = ?',
    // queryById: 'SELECT * FROM scene_footprint WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_footprint WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
const hand = {
    insert : 'INSERT INTO scene_handprint(PRINT_TYPE, PRINT_CODE, LEFT_POSITION,' +
        'localname,CREATE_USER_ID,COLLECTION_MODE,COLLECTED_BY_NAME,' +
        'COLLECTED_DATE,CRIMINAL_FLAG,UTILIZATION,ID,SERIAL_NO) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ',
    query : 'SELECT * FROM scene_handprint LIMIT 10',
    updateInfo: 'UPDATE scene_handprint SET PRINT_TYPE = ?,PRINT_CODE = ?,LEFT_POSITION = ?,' +
        'localname = ?, CREATE_USER_ID = ?, COLLECTION_MODE = ?, COLLECTED_BY_NAME = ?, ' +
        'COLLECTED_DATE = ?, CRIMINAL_FLAG = ?, UTILIZATION=? WHERE ID = ?',
    // queryById: 'SELECT * FROM scene_handprint WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_handprint WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select * from sys_dict where PARENT_KEY = ?'
};
const tool = {
    queryAll: 'SELECT * FROM scene_toolmark LIMIT 10',
    updateInfo: 'UPDATE scene_toolmark SET PRINT_TYPE = ?,COLLECTED_BY_NAME=?,TOOL_JUDGEMENT = ?,DESCRIPTION = ?,' +
        'LEFT_POSITION = ?, COLLECTION_MODE = ?, COLLECTED_DATE = ?, UTILIZATION = ?,CRIMINAL_FLAG=? WHERE ID = ?',
    queryById: 'SELECT * FROM scene_toolmark WHERE ID=?',
    queryById: 'SELECT *,temp.ID AS ID,common_picture_thumbnail.ID AS ID1 FROM (SELECT * FROM scene_toolmark WHERE ID = ?) AS temp inner join common_picture_thumbnail on temp.EVIDENCE_PHOTO_ID = common_picture_thumbnail.PICTURE_ID;',
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
const dictionary = {
    queryByDict: 'select DICT_VALUE1 AS name, DICT_KEY AS id from sys_dict where PARENT_KEY = ?'
};
module.exports = {
    bio, elec,file,foot,hand,tool,dictionary
};