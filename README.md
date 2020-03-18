# quiznet
Online quiz platform

The purpose of this package is to allow bible quizzers to practice and quiz with one another while online.

## How does online quizzing work?

 - Teams or multiple teams attend a joint audio teleconference.
 - Each participant and quiz master joins a quizzing event using a unique quiz ID.
 - Quizzers "jump" by pressing a designated key (up to 4 quizzers per laptop or 1 on a mobile device), 
   which time stamps the jump and plays a beep, letting the quiz master know to stop reading the question.
 - The quizmaster page lets them see who had the first jump.  They announce who got the jump, and proceed 
   as normal over the teleconference.

## Disclaimer
This project is in active development (as of March 2020), and so may experience some changes.  I'm not a 
web programmer by profession -- so play nice and don't try to break it!

# Instructions

### Before the quiz
The quizmaster/coach should send out teleconference details and a unique quiz ID that everyone will join.

### Setup
   - Turn the volume on your computer/device to the max so the quizmaster can hear it over the teleconference.
   - PC quizzers:
     - Enter the names and convenient jump keys for up to 4 quizzers.  For example, the keys "a","v","m","p"
       are somewhat spaced out to allow 4 quizzers around the same laptop.
     - Put the cursor in the "jump zone".
   - Mobile users: enter your name.  There is a jump button.
   - Test timestamp: use the "Test Jump" button to confirm that the timestamp happens near the closest 15second increment.
### The "jump"
   - PC quizzers: press your jump key!  After the question is complete, click the mouse to reset for the next jump.
   - Mobile quizzers: Press your jump button!  After the question is complete, press the "Reset" button.
   - For both: after you jump, the timestamp is shown after Device.  When you see "jump logged" after Server, you know your
     jump was recorded at the server.
### Quizmasters
 - Read the question as normal, when you hear a beep over the teleconference; stop!
 - Press "Read Benches" to poll the server for the winner of the jump.  Only one jump per device is registered.
 - You can, if necessary, repeat the "Read Benches" to clear the log.
 - Routinely, quizmasters cue quizzers to jump to test their bench.  A similar process can be used here:
   - Call out their name
   - They jump
   - The quizmaster presses "Read Benches" to verify they read the jump.
   - Quizzer can reset to test the next quizzer.
   
![quizmaster](/images/quizmaster.png | height=100)

![desktop](/images/desktop.png | height=100)

![mobile](/images/mobile.png | height=100)

# FAQ

### General
#### What can I used for a quiz ID?
You should be able to use almost anything within reason -- but don't use spaces or weird characters.  For the
various groups who may be conducting practices or meets, I would recommend the following conventions:

 - myDistrict_myDivision_myTeam for team practices (e.g. WGLD_A_witnesses)
 - myDistrict_myDivision for meets (e.g. WGLD_A)

#### What can I use for a quizzer name?
You should be able to use almost anything.  Many special characters are OK, too.  However, keep in mind that your 
quizmaster needs to be able to pronounce it!

#### Can I quiz on my phone?
Yes!  There is a mobile page which works in a manner very similar to the desktop version.  I don't know how responsive the
touch screen is (which is out of my control), but I welcome any findings in this area so we can share recommendations.

#### The beep is delayed.  Does that mean my jump was recorded late?
No.  The code timestamps the jump as soon as a key is pressed.  The playing of the beep happens after that, and 
is dependent on the sound file and how it is played in the browser.  Our testing indicates the beep does lag the
timestamp.

#### How can I check the timestamp on my jump?
The "Test Jump" button is meant for this purpose.  It will automatically jump as close to the next 15 second increment
as possible.  In this you'll be able to see the timestamp occurs normally within a few milliseconds of the the 15 second
interval, even if the beep happens slightly after.

#### What about network lags?
Most computers are time-synced through some central time server.  So wherever you are, urban or rural, your computer 
will put a synchronized timestamp on your jump.  Quizzer jumps are sent to the server where the original timestamps are 
compared, so any network lags will not play a role in determining who got the first jump.

### Quizmasters
#### How come I don't see all the quizzers who jumped?
With PC's only the fastest of the all the quizzers on that PC is logged and sent to the server.

#### 5s and 30s timers
These are provided for your benefit, to make it convenient to do timing from the same screen.  It doesn't affect the quiz at all.
