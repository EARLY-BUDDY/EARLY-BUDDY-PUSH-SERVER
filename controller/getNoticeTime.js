var moment = require('moment');
const alarm = require('../module/alarm');
var schedule = require('node-schedule');
const pool = require('../module/pool');

module.exports = {
    getNoticeTime : async (req, res) => {
        console.log(req.body);
        res.send('getNoticeTime success');
        let noticeTime = req.body.noticeTime;
        let alarmFlag = req.body.alarmFlag;
        let deviceToken = req.body.deviceToken;
        let userResult = (await pool.queryParam_Arr('SELECT userIdx, userName FROM users WHERE deviceToken = ?', [deviceToken]))[0];
        if(userResult === undefined) {
            return({code : 400, json : '디바이스 토큰이 없습니다'})
        }
        let userIdx = userResult.userIdx;
        let userName = userResult.userName;
        await alarm.setSchedule(deviceToken, noticeTime, alarmFlag, userName, userIdx);
        return({
            code : 200,
            json : '알람 추가 성공!'
        })
    }
}