const express = require('express')
const superagent = require('superagent')
const youtubedl = require('youtube-dl')

const app = express()

app.get("/dailymotion/:id", (req, res) => {
    const url = 'https://www.dailymotion.com/embed/video/' + req.params.id
    youtubedl.getInfo(url, ['--add-header', 'https://www.xtra.com.my/'], function(err, info) {
      if (err) {
          res.status(500).send(err)
          console.log(`${new Date()}: failed fetched ${req.params.id}`)
      } else {
          console.log(`${new Date()}: fetched ${req.params.id}, ${info.url}`)
          res.redirect(info.url)
      }
    })
});

app.listen(process.env.PORT || 3000);