const USERDATASMODEL = require('../../rentalapplication1-dev-df1fc9fd879f/models/userDatasModel')
async function updateReviewsInUser() {
    const findReviews = await REVIEWMODEL.find()
    let totalRating = 0
    for (let i = 0; i < findReviews.length; i++) {
        // console.log(i)
        totalRating += findReviews[i].numberOfStars / findReviews.length
    }
}