# quiznet
Online quiz platform

The purpose of this package is to allow bible quizzers to practice and quiz with one another while online.

<strong>Take a look at the <a href="https://vimeo.com/400944887" target="_blank">Quiznet Overview video</a>.</strong>

## How does online quizzing work?

 - Teams or multiple teams attend a joint audio teleconference.
 - Each participant and quiz master joins a quizzing event using a unique quiz ID.
 - Quizzers "jump" by pressing a designated key (up to 4 quizzers per laptop or 1 on a mobile device), 
   which time stamps the jump and plays a beep, letting the quiz master know to stop reading the question.
 - The quizmaster page lets them see who had the first jump.  They announce who got the jump, and proceed 
   as normal over the teleconference.
   
## Why Quiznet?  How is this different from other quizzing platforms?

The Quiznet system was designed to work with variable-speed networks.  That is, some users have slow connections or older computers which could significantly impact quizzer jumps because of network lags.  Instead, we go around the problem, by avoiding the time-arrival issue completely.  When the quizzer jumps, we time-stamp the event, then send it on its way to the server and quizmaster -- it doesn't matter how long it takes, because the comparison will be on the time-stamp of the jump, and not when it arrived.

There are three critical pieces to make this work:

 1. All the clocks have to be synced so the time-stamps can be properly compared.
 2. We need an estimate of the audio lag each user experiences due to the conference call.
 3. A mechanism to relay to the quizmaster when a jump has occurred so they can halt reading the question.
 
 The time syncing is done through estimating the offset between quizzers and quizmaster and the server using the [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) algorithm.  The audio lag is estimated through an audio calibration to measure the delay the quizzers are experiencing.  Both of these are handled in Quiznet.
 
The last requires some way to signal the quizmaster, and there are several options.  The application will "beep", but this won't work if the quizzer is on a headset.  If they are using Zoom or the like, a clever use of the chat function can work.  As a last resort, the quizzer can call out.  All of these will lead to some "bleeding" of the question, but that is probably a reality of the situation.

Desktop View | Mobile View | Quizmaster (Mobile)
------------ | ----------- | -------------------
<img src="/images/desktop.png" alt="quizmaster" height="300"/>|<img src="/images/mobile.png" alt="quizmaster" height="300"/>|<img src="/images/quizmaster.png" alt="quizmaster" height="300"/>

# Instructions

### Before the quiz
The quizmaster/coach should send out teleconference details and a unique quiz ID that everyone will join.

### Setup
   - Turn the volume on your computer/device to the max so the quizmaster can hear it over the teleconference.
   - Quizzers, refresh the page a few times until you get a consistent reading in the SYNC portion of the window.
   - PC quizzers:
     - Enter the names and convenient jump keys for up to 4 quizzers.  For example, the keys "a","v","m","p"
       are somewhat spaced out to allow 4 quizzers around the same laptop.
     - Put the cursor in the "jump zone".
   - Mobile users: enter your name.  There is a jump button.
   - Audio calibration: teleconference calls will often have a lag, and different call-ins may have different lags.
     This calibration is meant to level the field.
      - Quizmasters: Press <Start> to initiate a beep sequence.  Press <Mark> at the first beep only.  Press <Stop> when needed.
      - Quizzers: After the countdown, press <Mark> at each beep.
 
<img src="/images/audio_quizzer.png" alt="audio_quizzer" height="300"/>
 
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
   - Quizzer "resets" their device, and the quizmasters calls out the next quizzer.

# Known Issues
The Safari browser on iPhone and Apple computers seem to play the beep after a delay.  From various sources, it seems Safari reloads the beep sound each time the button is pressed, leading to the delay.  The current workaround is for the quizzers to verbally "HEY!" or the like to notify the quizzers they are jumping.  Please note that the timestamp is as soon as the button was pressed -- it is just a delay in the beep.

# FAQ

### General
#### What can I use for a quiz ID?
You should be able to use almost anything within reason -- but don't use spaces or weird characters.  For the
various groups who may be conducting practices or meets, I would recommend the following conventions:

 - myDistrict_myDivision_myTeam for team practices (e.g. WGLD_B_witnesses)
 - myDistrict_myDivision for meets (e.g. WGLD_A)

#### What can I use for a quizzer name?
You should be able to use almost anything.  Many special characters are OK, too.  However, keep in mind that your 
quizmaster needs to be able to pronounce it!

#### Can I quiz on my phone?
Yes!  There is a mobile page which works in a manner very similar to the desktop version.  I don't know how responsive the
touch screen is (which is out of my control), but I welcome any findings in this area so we can share recommendations.

#### The beep is delayed.  Does that mean my jump was recorded late?
This is a Known Issue (see above).  Rest assured, the page timestamps the jump as soon as a key is pressed.  The playing of the beep happens after that, and is dependent on the sound file and how it is played in the browser.  Our testing indicates the beep does lag the
timestamp.

#### Does it matter what web browser I use?
The application has been tested on Chrome, FireFox, and Edge on a Windows 10 machine, as well as Safari on iPhone.  If you have issues, please let us know along with the device and browser you were using.

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

### Technical Details
#### What is SYNC and offset?
Even for computers that are synced with a time server, there can be a discrepancy between "now" on your device and "now" on other's devices.  Clock synchronization across multiple devices in a diverse network is an important telecommunications issue and the [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) is a standard way of accomplishing this.  A simple implementation is used here to adjust the timestamps to be as close as possible to the time on the server.  The SYNC message reports an offset time in milliseconds of your device compared to the server.  This offset is applied to your timestamp, such that all quizzers have a timestamp that is referenced to the server.
