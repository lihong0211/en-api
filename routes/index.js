var express = require('express');
var router = express.Router();
//关联主程序
var words = require('../service/words');
const root = require('../service/root');
const affix = require('../service/affix');
const dialogue = require('../service/dialogue');
const livingSpeech = require('../service/livingSpeech');

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

module.exports = router;
