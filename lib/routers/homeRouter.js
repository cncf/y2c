const express = require('express')
const Octokit = require('@octokit/rest')

const router = express.Router()

router.get('/', async (req, res) => {
  if (req.session.githubToken) {
    const octokit = Octokit({ auth: req.session.githubToken, previews: ['machine-man-preview'] })
    const { data } = await octokit.request('GET /user/installations')
    const { installations } = data
    res.render('home.ejs', { currentUser: req.session.githubUser, installations })
  } else {
    res.redirect('/github/sign-in')
  }
})

module.exports = router
