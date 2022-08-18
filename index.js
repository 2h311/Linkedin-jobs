const axios = require('axios');
const cheerio = require("cheerio");

let url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=email%2Bdeveloper&location=United%2BStates&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=2931031787&position=1&pageNum=0&start=0";
linkedinJob = Array();

axios(url)
.then(response =>{
    const html = response.data;
    // console.log(html)
    const $ = cheerio.load(html);
    const jobs = $('li');
    // console.log(jobs.length);
    jobs.each((index, element) =>{
        const jobTitle = $(element).find('h3.base-search-card__title').text().trim()
        const company = $(element).find('h4.base-search-card__subtitle').text().trim()
        const location = $(element).find('span.job-search-card__location').text().trim()
        const link = $(element).find('a.base-card__full-link').attr('href')        
        // console.log(`${jobTitle},${company},${location},${link}`);
        linkedinJob.push({
            'Title': jobTitle,
            'Company': company,
            'Location': location,
            'Link': link,
        })
    })
    console.log(linkedinJob);
});

// https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Python%20Junior%20Technical%20Assistant%20&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=50
// https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Python%20Junior%20Technical%20Assistant%20&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=75
// https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Python%20Junior%20Technical%20Assistant%20&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=100


// Make the script filtered jobs by title, so you only extract those cards containing the keyword “email developer” or “html email”.
// Right now the script is going through the pages too fast. Add a buffer between requests so it only sends a new request after 5 seconds, it will help you protect your IP.