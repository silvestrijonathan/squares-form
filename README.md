## README

### Setup

Created with create-react-app, so `yarn install` and `yarn start` should be sufficient here.

### General Notes

- Full disclosure: I googled a quick function to convert current datetime into a more readable format, vs. just raw timestamps.
- Loading animation taken from here: https://www.w3schools.com/howto/howto_css_loader.asp
- I kept all the functions in one file. I did not feel like it would be necessary to split up for the sake of this challenge, but if I were to split files up:
  - I'd put the mathematical calculations in a utils/math file.
  - I'd put the datetime converter in a utils/date file.
  - My memoizing function would live in a utils/memo file.
  - The API call would be within whatever architecture the app is using, so maybe actions/api.

### Approach Notes

- I would like to speak to my caching strategy here. The problem set did not specifically call for this approach, but in my mind, this would be how a client/server setup would exist for this use case. If a request is made for a specific number, that number and all the necessary response data would be stored in the database, such that upon returning to their profile they could see their past calculations.
- While I did not go the full route of setting persistent data up (LocalStorage was a candidate for the solution at one point), I wanted to closely simulate a stored response experience for repeat calculations as much as possible. This effectively curtailed the Bonus question, since the memoized function handles for the case of re-calculating the value of a number, instead ensuring the datetime, last_datetime, and occurrences fields are updated.
- The trade-off with this approach being that, if we had no constraints on the number size, we'd risk being able to store more than 100 entries in memory.
- The submittedValue state is used to best simulate the necessary lifecycle transitions for my useEffect hook.
- I did some setup to prevent memory leaks if the component unmounted for demonstration purposes.
- No styling for the main component as I felt it was more important for now to get the implementation to the challenge's parameters.
