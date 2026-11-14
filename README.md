# MajorMatch - "Don't just choose your major. Explore it."

University project prototype: HTML5, CSS3, vanilla JavaScript, PHP, MySQL (no frameworks).

## Run it
1. Install XAMPP (or WAMP/MAMP) and copy the `MajorMatch` folder into `htdocs`.
2. Start Apache + MySQL. In phpMyAdmin choose **Import** and import `database/database.sql`
   (it creates the `majormatch` database and fills it).
3. If your MySQL password is not empty, edit the 4 settings at the top of `php/db.php`.
4. Open `http://localhost/MajorMatch/`.

No MySQL running? The site still works: `php/db.php` falls back to `php/fallback.json`
(same data), only saving ratings to the database is skipped.

Quick test without XAMPP: `cd MajorMatch && php -S localhost:8000`.

## Course data
The course rows in `database/database.sql` and `php/fallback.json` are based on the uploaded Qassim University study-plan PDFs for Computer Science, Information Technology, Cybersecurity, and Computer Engineering.

The plans include elective/option sections, so the number of displayed course entries can be larger than the official degree credit-hour total. The Study Plans page reports course entries rather than summing them as a degree total.

The Compare page groups shared/different courses by official course code. Its topic dots are an exploration aid calculated from matching course titles; they are not official curriculum ratings.

Games and UI & Design remain optional interest cards. They are not presented as official study-plan fields.

## Files
| Path | What it does |
|---|---|
| `index.php` | Home: hero + interest cards |
| `majors.php`, `major-details.php` | Explore the four majors |
| `experience.php` + `js/experiences.js` | The 17 mini experiences + "Did you enjoy this?" rating |
| `explore.php` + `js/explore.js` | Interest dashboard ("You're building your profile...") |
| `quiz.php` + `js/quiz.js` | 6-question preference quiz (questions come from MySQL) |
| `result.php` + `js/result.js` | Result with % match |
| `compare.php` + `js/compare.js` | Compare 2-4 majors, shared / different courses |
| `study-plans.php` + `js/study-plans.js` | Level 1-10 course cards + search |
| `php/db.php` | Database connection + `mm_rows()` helper |
| `php/get-major.php`, `get-courses.php`, `save-result.php` | JSON endpoints |
| `js/data.js` | Interests, topic table, which dimensions each experience feeds |
| `js/main.js` | Saved state (localStorage) + scoring |

## How the result is calculated (js/main.js, `computeResult`)
Per major: quiz answers (50%) + ratings of that major's mini experiences (35%) +
selected interests (15%). Missing parts are ignored and the rest re-weighted.
Ratings: Loved = 1, Okay = 0.55, Not really = 0.

## Ideas for the team
Add a login, save results per student, add an admin page for editing courses, add Arabic (RTL) version.
