var express = require('express');
var router = express.Router();
//关联主程序
var words = require('../service/words');
const root = require('../service/root');
const affix = require('../service/affix');
const dialogue = require('../service/dialogue');
const livingSpeech = require('../service/livingSpeech');

const pddReport = require('../service/peach/pddReport');
const version = require('../service/peach/version');
const aliReport = require('../service/peach/aliReport');
const checkReport = require('../service/peach/check');
const config = require('../service/peach/config');
const pluginStatistic = require('../service/peach/pluginStatistic');

//增
router.post('/words/add', function (req, res, next) {
  words.add(req, res, next);
});

//删
router.post('/words/delete', function (req, res, next) {
  words.delete(req, res, next);
});
//改
router.post('/words/update', function (req, res, next) {
  words.update(req, res, next);
});
//查
router.post('/words/list', function (req, res, next) {
  words.list(req, res, next);
});

//增
router.post('/root/add', function (req, res, next) {
  root.add(req, res, next);
});

//删
router.post('/root/delete', function (req, res, next) {
  root.delete(req, res, next);
});
//改
router.post('/root/update', function (req, res, next) {
  root.update(req, res, next);
});
//查
router.post('/root/list', function (req, res, next) {
  root.list(req, res, next);
});

//增
router.post('/affix/add', function (req, res, next) {
  affix.add(req, res, next);
});

//删
router.post('/affix/delete', function (req, res, next) {
  affix.delete(req, res, next);
});
//改
router.post('/affix/update', function (req, res, next) {
  affix.update(req, res, next);
});
//查
router.get('/affix/list', function (req, res, next) {
  affix.list(req, res, next);
});

//增
router.post('/dialogue/add', function (req, res, next) {
  dialogue.add(req, res, next);
});

//删
router.post('/dialogue/delete', function (req, res, next) {
  dialogue.delete(req, res, next);
});
//改
router.post('/dialogue/update', function (req, res, next) {
  dialogue.update(req, res, next);
});
//查
router.get('/dialogue/list', function (req, res, next) {
  dialogue.list(req, res, next);
});

//增
router.post('/living-speech/add', function (req, res, next) {
  livingSpeech.add(req, res, next);
});

//删
router.post('/living-speech/delete', function (req, res, next) {
  livingSpeech.delete(req, res, next);
});
//改
router.post('/living-speech/update', function (req, res, next) {
  livingSpeech.update(req, res, next);
});
//查
router.post('/living-speech/list', function (req, res, next) {
  livingSpeech.list(req, res, next);
});

// 拼多多
router.post('/pddReport/chat/add', function (req, res, next) {
  pddReport.addChat(req, res, next);
});
router.post('/pddReport/chat/list', function (req, res, next) {
  pddReport.listChat(req, res, next);
});
router.post('/pddReport/rp/add', function (req, res, next) {
  pddReport.addRp(req, res, next);
});
router.post('/pddReport/rp/list', function (req, res, next) {
  pddReport.listRp(req, res, next);
});
router.post('/pddReport/manual/add', function (req, res, next) {
  pddReport.addManual(req, res, next);
});
router.post('/pddReport/manual/list', function (req, res, next) {
  pddReport.listManual(req, res, next);
});

router.post('/jdReport/version/add', function (req, res, next) {
  version.addVersion(req, res, next);
});

router.post('/jdReport/version/list', function (req, res, next) {
  version.listVersion(req, res, next);
});

router.post('/aliReport/rp/add', function (req, res, next) {
  aliReport.add(req, res, next);
});
router.post('/aliReport/rp/get', function (req, res, next) {
  aliReport.get(req, res, next);
});
router.post('/aliReport/rp/update', function (req, res, next) {
  aliReport.update(req, res, next);
});

router.post('/peach/check/add', function (req, res, next) {
  checkReport.add(req, res, next);
});
router.get('/peach/config/list', function (req, res, next) {
  config.listConfig(req, res, next);
});
router.post('/peach/version/add', function (req, res, next) {
  version.addVersion(req, res, next);
});

router.post('/peach/plugin-statistics/add', function (req, res, next) {
  pluginStatistic.add(req, res, next);
});
router.post('/peach/plugin-statistics/list', function (req, res, next) {
  pluginStatistic.list(req, res, next);
});
router.post('/peach/plugin-statistics/detail', function (req, res, next) {
  pluginStatistic.detail(req, res, next);
});

module.exports = router;
