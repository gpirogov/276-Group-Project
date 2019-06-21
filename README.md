（**new) update : https://docs.google.com/document/d/1jYgzjwvB6glIDtZ6z-6d6K0Vw6A1n597xzEC_TgzWCY/edit

CMPT276 TEAM - proposal

Members: 

Wai Si  Yip (Raymond) - 301297354

Gleb Pirogov - 301298139

Gloria Yoon - 301316188

Justin Siu  - 301326899

Benny Mai - 301225053


Requirements:  

(1)At least one API

(2) Real-time feature

(3) API should be a significant part


Iteration 0 Overview

What is the name of your web application?

Burning+

 
Do we have a clear understanding of the problem?

How is this problem solved currently (if at all)?  


Keeping track of fitness progress is typically done manually through pen/paper, spreadsheets or dedicated fitness app. Researching workouts, routines and diets on the other hand are typically done using third party sources such as reading fitness blogs/forums and YouTube videos.


How will this project make life easier?  

By consolidating, integrating, and highlighting useful information for a user who is beginning to take an interest in fitness. Currently there are many sources for workouts, routines, and diets that may intimidate new users. Our web application will help new users and first time gym goers achieve their fitness goals much easier via suggestions (starting with those that have been given a low difficulty rating) through questionnaires and helping them gradually integrate a healthier lifestyle. It will help new users while, however, not excluding experienced users, allowing them to introduce and set their own workout routines as they please.


Who is the target audience? Who will use your product? 

The audience will consist of teens and adults who have an interest in fitness. This app will be tailored to both those who are new and those who are experienced and want to make their experience more convenient. The product will suit people who want to exercise on their own time and have a specific goal they want tailored to.

What is the scope of your project?

individual features, or one main feature?

The project has many individual features including; recommended workout activities and guiding users through them, calorie counter, supplement/diet suggestions, the tracking of progress and a message board/forum so users may share their experience with the app.

It will also feature the ability for users to customize their workout experience and change it from their set/suggested routine. There will be a notetaking feature where users can record their workout experience that they may refer to in their future workout sessions.  The users may also print out a copy of their workout schedule either set by the user (advanced) or ones generated via suggestions made (for beginners).

Sample Story / Description of App:

Person who has little to no experience with working out visits our website. The website sees that they’ve never visited before and prompts them with a “welcome!” Page with a sign up button. After clicking on it they see 2 buttons that say “beginner” or “experienced”, with brief explanations of each. Clicking on “beginner” they are prompted to make a username/password, and are asked “what would you like to get out of this site?” w/ some options like “i want to lose weight” or “i want to be really strong” or “i want to look fit” or “i just want a healthier lifestyle”. Clicking on any of these options results in different recommendations. 
Option 1 would recommend cardio activities like jogging or biking, and would have you use the websites’ calorie-counter (external API) a lot. options 2 and 3 would prompt another question: “how often can you dedicate, per week, to going to the gym?” Based on the user’s answer, it would give a few possible workout routines they could follow, recommending one, but allowing the user to choose their preference. If they said “i want to look fit”, for instance, and said they could work out 4 or more days a week, it might recommend the 4-day “bro split”; where you do chest exercises one day, leg next, shoulder next, back next, cycling biceps and triceps every 2 days. For “I want to look fit” and just 2 days a week, it could recommend a full-body workout each gym day. It could also recommend yoga or some cardio exercises as well. For the “I want to be really strong” option, it might recommend pull exercises one day, push exercises next, or using just machines one day, and just free weights the next. For either option, it would also tell you what supplements you should consider buying (e.g. creatine), and tell you how much and what kind of protein you should start incorporating into your diet (whether that be protein powder or just more meat or eggs or soy). Option 4 could just be a mix of the previous 3 options — focussing on a bit of both going to the gym and dieting. 
Whatever workout recommendation you chose, it would tell you what exercises you should do each gym day, with a video showing proper form next to each of them. E.g overhead press, seated incline dumbbell press, shoulder flies, and rear deltoid cable crossovers for “shoulder day”. If the user is new, it could suggest some more beginner-friendly exercises (like just using the machines) before starting the other major ones. The site would also recommend a rep / set amount to start with. e.g. 5x5 (5 sets with 5 repetitions each), or 8x3, 12x3, or, 3 sets of 8 then 10 then 12 reps, based on whether you prefer heavier weights for less time (as long as your form is good) or lower weight for more time. 
After working out a couple days, and finding their comfortable maximum weights for their exercises, the user would start updating the site with their numbers. The user should be increasing the weight they lift by 2.5/5 pounds every time they do a specific exercise (so every 4-7 days). If they’re not able to do their previous number of sets and reps then they stay at that weight until they can. The site would track their progress, and could display graphs showing their improvement over time. It could also notice if their numbers are disproportionate in any group of exercises (if, for instance, their bicep / tricep lifts are much higher [proportion-wise] than their shoulder exercises), and would tweak their routine accordingly (perhaps suggesting trying higher weights, or adding more shoulder exercises on shoulder day, in this case). If after using their current routine for a couple weeks/months, the users progress starts to “plateau” (they stop being able to increase their lift-weight, despite trying for several workout days/weeks), the site would recommend a different routine for that part of the body, or a diet change. 
    If the user clicked on “experienced”, when first visiting the site, it would skip the questionnaire, and simply let them select the routine they are already doing, and wouldn’t prompt them with instruction videos or extra info. The primary point of the app would be to give the user a place to record their lifts, and be able to see graphs / visualizations of their progress over time, and to know what exercises they should be doing each day, or when to change up their routine or diet.


Some additional features we might want to include: 

- An input box for taking notes 

- A timer, to allow the user to dynamically time themselves between workouts

- A more in-depth meal plan or nutritional info.

- The ability to customize / change their own specifics exercise from given workouts

- Have difficulty ratings for each exercise

- A message board / forum / chat room for chatting with other users

- The ability to print out their schedule

- Calculate their estimated “1 rep max” based on current workout performance

