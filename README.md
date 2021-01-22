# quiznet
Online quiz platform

The purpose of this package is to allow bible quizzers to practice and quiz with one another while online.

<strong>Take a look at the <a href="https://vimeo.com/400944887" target="_blank">Quiznet Overview video</a>.</strong>

## How does online quizzing work?

 - Teams or multiple teams attend a joint audio teleconference.
 - Each participant and quiz master joins a quizzing event using a unique quiz ID.
 - Quizzers "jump" by pressing a designated key (up to 4 quizzers per laptop or 1 on a mobile device), 
   which time stamps the jump.  The quizmaster will hear a beep and stop reading the question.
 - The quizmaster page lets them see who had the first jump.  They announce who got the jump, and proceed 
   as normal over the teleconference.
   
## Why Quiznet?  How is this different from other quizzing platforms?

The Quiznet system was designed to work with variable-speed networks.  That is, some users have slow connections or older computers which could significantly impact quizzer jumps because of network lags.  Instead, we go around the problem, by avoiding the time-arrival issue completely.  When the quizzer jumps, we time-stamp the event, then send it on its way to the server and quizmaster -- it doesn't matter how long it takes, because the comparison will be on the time-stamp of the jump, and not when it arrived.

There are two critical pieces to make this work:

 1. All the clocks have to be synced so the time-stamps can be properly compared.
 2. The quizmaster has to know when a jump has occurred so they can halt reading the question.

 The time syncing is done through estimating the offset between quizzers and quizmaster and the server using the [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) algorithm.  When a quizzer jumps, their jump is recorded, and the quizmaster will hear a beep.  We know teleconference solutions experience some degree of audio lag.  However, those services will adaptively try to "catch up" and thus we can't properly handle it -- we'll just have to accept that they will try to minimize any audio lag.  

Desktop View | Mobile View | Quizmaster (Mobile)
------------ | ----------- | -------------------
<img src="/images/desktop.png" alt="quizmaster" height="300"/>|<img src="/images/mobile.png" alt="quizmaster" height="300"/>|<img src="/images/quizmaster.png" alt="quizmaster" height="300"/>

# Instructions

### Before the quiz
The quizmaster/coach should send out teleconference details and a unique quiz ID that everyone will join.

I would highly recommend reviewing Pacific Northwest's excellent [Virtual Quizzing](https://pnwquizzing.org/references_for_quizzing/virtual_quizzing.md) page for some best practices.

### Setup
   - Quizzers and Quizmaster should refresh the page a few times until you get a consistent reading in the SYNC portion of the window.
   - We highly recommend quizzers and quizmaster use a personal computer for the best experience:
     - Enter the names and convenient jump keys for up to 4 quizzers.  For example, the keys "a","v","m","p"
       are somewhat spaced out to allow 4 quizzers around the same laptop.
     - Put the cursor in the "jump zone".
   - If necessary, a mobile device can be used: enter your name.  There is a jump button.
 
### The "jump"
   - PC quizzers: press your jump key!  After the question is complete, click the mouse to reset for the next jump.
   - Mobile quizzers: Press your jump button!  It will reset itself after a short period.
   - For both: after you jump, the timestamp is shown after Device.  When you see "jump logged" after Server, you know your
     jump was recorded at the server.
### Quizmasters
 - Read the question as normal, pressing the "Question" button at the normal time.  When you hear a beep; stop!
 - After a slight delay, the page will show the winner of the jump.  Only one jump per device is registered.  If desired you can press "Read Benches" to reread jumps from the server.
 - Routinely, quizmasters cue quizzers to jump to test their bench.  A similar process can be used here:
   - Call out their name
   - They jump
   - The quizmaster presses "Read Benches" to verify they read the jump.
   - Quizzer "resets" their device, and the quizmasters calls out the next quizzer.

# Known Issues

 - Beep delay: The Safari browser on iPhone and Apple computers seem to play the beep after a delay.  From various sources, it seems Safari reloads the beep sound each time the button is pressed, leading to the delay.  In addition, it seems there is a slight delay when using a mobile device jump button, so a short fixed offset has been applied to even the playing field somewhat.  Again, the best situation is to quiz from a personal computer, not a mobile device.
 
 - Quizmasters double-clicking the "question" button: Don't do this.  You will find that NO quizzer jumps will be recorded.

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
Yes!  There is a mobile page which works in a manner very similar to the desktop version.  However, it is recommended to use a personal computer if possible because of some delays noted above.  We've tried our best to compensate and make it even, but you've been warned.

#### The beep is delayed.  Does that mean my jump was recorded late?
This is a Known Issue (see above).  Rest assured, the page timestamps the jump very soon after a key is pressed.  The playing of the beep happens noticably after that, and is dependent on the sound file and how it is played in the browser.  Our testing indicates the beep does lag the
timestamp -- most notably on iPhones, and we suspect iOS using Safari.

#### Does it matter what web browser I use?
The application has been tested on Chrome, FireFox, and Edge on a Windows 10 machine, as well as Safari on iPhone.  We recommend using a personal computer for the best experience over a mobile device or tablet.  If you have issues, please let us know along with the device and browser you were using.

#### What about network lags?
Most computers are time-synced through some central time server.  So wherever you are, urban or rural, your computer 
will put a synchronized timestamp on your jump.  Quizzer jumps are sent to the server where the original timestamps are 
compared, so any network lags should play a minimal role in determining who got the first jump.

### Quizmasters
#### How come I don't see all the quizzers who jumped?
With PC's only the fastest of the all the quizzers on that PC is logged and sent to the server.

#### 5s and 30s timers
These are provided for your benefit, to make it convenient to do timing from the same screen.  It doesn't affect the quiz at all.

### Technical Details
#### What is SYNC and offset?
Even for computers that are synced with a time server, there can be a discrepancy between "now" on your device and "now" on other's devices.  Clock synchronization across multiple devices in a diverse network is an important telecommunications issue and the [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) is a standard way of accomplishing this.  A simple implementation is used here to adjust the timestamps to be as close as possible to the time on the server.  The SYNC message reports an offset time in milliseconds of your device compared to the server.  This offset is applied to your timestamp, such that all quizzers have a timestamp that is referenced to the server.

#### Will refreshing the page help?
It shouldn't be necessary (but won't hurt).  The page will sample the network offset and delay after every jump and reading of the benches, so it shouldn't in generally be necessary.
