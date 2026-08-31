const fs = require("fs");
const path = require("path");

const ARTICLES = {
  "stop-doomscrolling-when-you-have-real-work-to-do": {
    title: "3 Tips to Stop Doomscrolling When You Have Real Work to Complete",
    description: "Learn three practical ways to stop doomscrolling when you need to work: add friction, create a stopping point, and make the real task easier to begin.",
    dek: "Three research-backed ways to escape the endless feed, make your phone less tempting, and return to the work that deserves your attention.",
    image: "https://www.luzora.app/assets/images/blog/doomscrolling/cover.png?v=20260831",
    dateLabel: "August 31, 2026",
    readTime: "7 min read",
    datePublished: "2026-08-31T09:00:00+01:00",
    dateModified: "2026-08-31T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["doomscrolling", "stop doomscrolling", "social media distraction", "focus", "procrastination", "screen time", "digital wellbeing"],
    faqs: [
      {
        question: "Why do I doomscroll when I have important work to do?",
        answer: "Doomscrolling can provide immediate relief from work that feels difficult, uncertain, boring, or emotionally uncomfortable. The feed is easy to enter and offers continuous novelty, while the work may require effort before providing any reward."
      },
      {
        question: "How can I stop doomscrolling immediately?",
        answer: "Close the application, place your phone out of reach, and define one small action you can complete in ten minutes. If you repeatedly reopen the application, temporarily block it or disable mobile internet during the work period."
      },
      {
        question: "Does turning my phone to grayscale reduce scrolling?",
        answer: "Experimental research suggests that grayscale can reduce screen time by making the phone less visually attractive. It is best treated as a small piece of environmental friction, not a complete solution."
      },
      {
        question: "Should I stop following the news?",
        answer: "Not necessarily. Choose a small number of trustworthy sources and check them during a planned window. The objective is intentional consumption rather than complete avoidance."
      }
    ],
    bodyHtml: `
      <figure class="article-cover-image"><img src="/assets/images/blog/doomscrolling/cover.png?v=20260831" alt="An endless phone feed crossing three yellow stopping points before leading back to focused work on a laptop" width="1731" height="909" decoding="async" loading="eager" fetchpriority="high" /></figure>
      <div class="article-lead is-revealed" data-article-section>
        <p>It is 9:18 in the morning.</p>
        <p>You sit down to finish a proposal that should have gone out yesterday. Before opening the document, you pick up your phone to check one message.</p>
        <p>There is a worrying headline beneath it. You open the story. Then the comments. Someone links to another post with an even worse headline. A video starts playing. You scroll to see what happens next.</p>
        <p>When you finally look at the time, it is 9:57.</p>
        <p>The proposal has not moved. You feel less prepared to begin it than you did before—and now you are annoyed with yourself too.</p>
        <p>If this happens to you, the obvious advice is to put your phone down and exercise more discipline. But that misses part of the story.</p>
        <p>Sometimes you are not scrolling because the content is particularly enjoyable. You are scrolling because the work in front of you feels uncertain, difficult, or uncomfortable—and the phone offers somewhere easier to go.</p>
        <p>To stop, you need more than willpower. You need to make scrolling less automatic, give it a clear ending, and make your real work easier to enter.</p>
      </div>
      <section class="article-section is-revealed" id="quick-answer" data-article-section>
        <h2>The short answer</h2>
        <p>To stop doomscrolling when you need to work, add friction before you open the feed, decide how the scrolling session will end before it begins, and make the first step of your real task small enough to start immediately.</p>
        <p>You do not have to give up your phone or stop following the news. The goal is to prevent an unplanned check from deciding how you spend the next hour.</p>
        <p class="article-callout">Make the scroll less convenient. Give it an ending. Make the work easier to enter.</p>
      </section>
      <section class="article-section is-revealed" id="why-doomscrolling-is-difficult-to-stop" data-article-section>
        <h2>Why doomscrolling is so difficult to stop</h2>
        <p>Doomscrolling is the repeated consumption of negative or distressing news, even after the experience has stopped being useful and has started making you feel worse.</p>
        <p>You may begin because you genuinely want information. Something important is happening, and knowing more feels like a way to become safer or more prepared. But there is always another update, opinion, warning, or prediction. The feed never says, “You understand enough now.”</p>
        <p>Research on problematic news consumption has found that some people become preoccupied with the news, struggle to reduce their consumption, and continue checking even when it interferes with the rest of their lives. Higher levels of this behaviour have also been associated with poorer mental and physical well-being. The research does not prove that scrolling caused every outcome, but it shows that the pattern can become genuinely disruptive. <a href="https://pubmed.ncbi.nlm.nih.gov/35999665/" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>And when uncomfortable work is waiting nearby, the feed becomes even harder to leave. Facing a task with an uncertain outcome requires effort. Moving your thumb produces something new immediately. That is not a fair fight, so change the conditions.</p>
      </section>
      <section class="article-section is-revealed" id="add-friction-before-the-urge-arrives" data-article-section>
        <h2>1. Add friction before the urge arrives</h2>
        <p>Imagine putting a bowl of sweets on your desk and telling yourself not to notice it. You might resist for a while. But every time you see the bowl, you have to make the decision again.</p>
        <p>Your phone can work the same way. A notification appears. You see an application badge. Your hand reaches for the device before you have consciously decided to stop working.</p>
        <p>The solution is not to make the correct choice fifty times. It is to remove some of the unnecessary choices.</p>
        <p class="article-list-intro">Before beginning important work:</p>
        <ul>
          <li>Turn off notifications that do not require an immediate response.</li>
          <li>Move distracting applications away from your home screen.</li>
          <li>Put your phone somewhere that requires you to stand up.</li>
          <li>Use grayscale if colourful feeds keep pulling you back.</li>
          <li>Block social media or mobile internet during one focused work period.</li>
        </ul>
        <p>You do not need to apply all five. Choose the smallest change that creates a pause between the urge and the action.</p>
        <p>A preregistered field experiment found that putting smartphones into grayscale produced an immediate reduction in objectively measured screen time. Self-imposed time limits also helped, although their effect was smaller and more gradual. The researchers did not find an immediate improvement in academic performance or well-being, so grayscale is not a magical productivity switch. It simply makes the phone a little less visually persuasive. <a href="https://doi.org/10.1089/cyber.2022.0027" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>A larger randomized study blocked mobile internet on participants’ phones for two weeks while still allowing calls and text messages. Participants showed improvements in sustained attention, mental health, and subjective well-being. <a href="https://doi.org/10.1093/pnasnexus/pgaf017" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>You do not have to turn your smartphone into a basic phone for two weeks. Try it for 30 minutes. Put the phone across the room, block the two applications that most often take you away, and open only what your work requires. If 30 minutes feels unrealistic, begin with ten.</p>
        <p class="article-callout">Do not make your self-control fight the same battle every five minutes. Change the environment before the urge arrives.</p>
      </section>
      <section class="article-section is-revealed" id="decide-where-the-scroll-ends" data-article-section>
        <h2>2. Decide where the scroll ends before you open it</h2>
        <p>“I’ll quickly check the news” is not a complete plan. What does quickly mean? Which news? How will you know when you have seen enough? If those questions have no answers, the feed will answer them for you.</p>
        <p>Before opening an application, decide your purpose, which source you will use, how long you will stay, and what action signals that you are finished.</p>
        <p>A real plan might sound like this: “After lunch, I will check these two trusted sources for ten minutes. When the timer rings, I will close the application and return to the report.” That is different from promising yourself that you will use social media less. It gives the session an edge.</p>
        <p>In one experiment, 143 university students were assigned either to continue using social media normally or to limit Facebook, Instagram, and Snapchat to ten minutes per platform each day. After three weeks, the limited-use group showed reductions in loneliness and depression compared with the control group. The study involved a relatively small student sample and examined well-being rather than productivity, so 30 minutes should not be treated as a universal prescription. Its more useful lesson is that a specific limit is easier to act on than a vague intention. <a href="https://doi.org/10.1521/jscp.2018.37.10.751" target="_blank" rel="noopener noreferrer">Read the study</a>.</p>
        <p>You can also replace the endless feed with a finite source. Instead of opening a homepage that refreshes forever, subscribe to one daily briefing. Save two publications you trust. Read the story you intended to read without entering the comments.</p>
        <p>You are not trying to become uninformed. You are choosing a container for the information.</p>
        <p>When the timer rings, do not negotiate for one more post. Close the application, place the phone down, and physically change your position. Stand up, take a breath, or get a glass of water. That small movement marks the end of one activity and the beginning of another.</p>
        <p class="article-callout">An endless feed will not tell you when you have seen enough. Bring your own stopping point.</p>
      </section>
      <section class="article-section is-revealed" id="make-the-work-easier-to-enter" data-article-section>
        <h2>3. Make the work easier to enter</h2>
        <p>You have put the phone down. Now the proposal is still waiting.</p>
        <p>This is the moment many productivity tips ignore. Removing the distraction does not automatically make the real task appealing.</p>
        <p>Perhaps you do not know how the proposal should begin. Maybe you are worried that the client will reject it. Perhaps the project has grown so large that opening the document makes you feel behind before you have written a word. So your brain looks for relief. The phone happens to be the closest exit.</p>
        <p>Research on procrastination has repeatedly connected delay with task aversiveness—how unpleasant, confusing, or intimidating a task feels. Procrastination can offer short-term mood relief, even when it creates a larger problem for your future self. <a href="https://doi.org/10.1016/S0191-8869(99)00091-4" target="_blank" rel="noopener noreferrer">Read about task aversiveness</a> and <a href="https://doi.org/10.1111/spc3.12011" target="_blank" rel="noopener noreferrer">short-term mood repair</a>.</p>
        <p>Before blaming yourself for scrolling, ask: “What am I trying not to feel about this task?” The answer may be boredom, confusion, fear, resentment, or simple tiredness. Naming the feeling will not complete the work, but it can show you what kind of entrance you need.</p>
        <p>If the task feels confusing, define the next visible action. If it feels too large, reduce the amount you are asking yourself to complete. If it feels intimidating, give yourself permission to produce a rough first attempt.</p>
        <p>“Finish the proposal” is not an entrance. “Open the proposal, read the last paragraph, add three section headings, and work on the first section for ten minutes” gives you somewhere to begin.</p>
        <p>The goal of those ten minutes is not to finish. It is to cross the distance between avoiding the task and being inside it. Before your next break, leave yourself a return note such as, “Next: add the price comparison beneath the second heading.” Returning will no longer require you to understand the entire project again.</p>
        <p class="article-callout">If the work feels too heavy to approach, do not wait for motivation. Make the entrance smaller.</p>
      </section>
      <section class="article-section is-revealed" id="when-you-are-already-trapped" data-article-section>
        <h2>What to do when you are already trapped in the feed</h2>
        <p>Sometimes you notice the problem only after 40 minutes have disappeared. Do not spend the next ten minutes insulting yourself. That simply makes returning to work feel worse.</p>
        <p class="article-list-intro">Use this reset:</p>
        <ol>
          <li>Close the application completely.</li>
          <li>Put the phone beyond arm’s reach.</li>
          <li>Say what you intended to be doing.</li>
          <li>Write down the smallest visible action.</li>
          <li>Work on it for ten minutes.</li>
        </ol>
        <p>For example: “I intended to prepare tomorrow’s presentation. The next action is to open the deck and name the first three slides.” Then begin before your mind starts another debate.</p>
        <p>You are not trying to rescue the entire day in one dramatic burst. You are rescuing the next ten minutes.</p>
      </section>
      <section class="article-section is-revealed" id="build-a-boundary-that-fits-your-life" data-article-section>
        <h2>You do not need to become unreachable</h2>
        <p>Not everyone can turn off their phone for hours. You may care for someone who needs to reach you. Your team may rely on you. Your work may happen through the same device that distracts you.</p>
        <p>Build a boundary that matches your actual life. Allow calls from important contacts while silencing application notifications. Block one feed rather than the entire internet. Work for 25 minutes instead of two hours. Tell your team when you will check messages again.</p>
        <p>The best boundary is not the strictest one. It is the one you can trust yourself to use repeatedly.</p>
      </section>
      <section class="article-section is-revealed" id="a-better-way-to-measure-progress" data-article-section>
        <h2>A better way to measure progress</h2>
        <p>Do not ask whether you avoided every unnecessary scroll today. Ask whether you noticed when scrolling stopped being useful, created at least one protected period for real work, and returned to the task more quickly than you normally would.</p>
        <p>The habit changes each time you interrupt the loop.</p>
        <p>Some days, you will catch yourself before opening the application. Other days, you will catch yourself after half an hour. Both moments still offer the same choice: continue moving through a feed without an ending, or return to one small piece of work that can actually move your life forward.</p>
        <p>Your phone does not have to disappear. It just should not decide what deserves your day.</p>
        <p class="article-callout">Make the scroll less convenient. Give it an ending. Make the work easier to enter.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions-about-doomscrolling" data-article-section>
        <h2>Common questions about doomscrolling</h2>
        <p>Why do I doomscroll when I have important work to do? Doomscrolling can provide immediate relief from work that feels difficult, uncertain, boring, or emotionally uncomfortable. The feed is easy to enter and offers continuous novelty, while the work may require effort before providing any reward.</p>
        <p>How can I stop doomscrolling immediately? Close the application, place your phone out of reach, and define one small action you can complete in ten minutes. If you repeatedly reopen the application, temporarily block it or disable mobile internet during the work period.</p>
        <p>Does turning my phone to grayscale reduce scrolling? Experimental research suggests that grayscale can reduce screen time by making the phone less visually attractive. It is best treated as a small piece of environmental friction, not a complete solution.</p>
        <p>Should I stop following the news? Not necessarily. Choose a small number of trustworthy sources and check them during a planned window. The objective is intentional consumption rather than complete avoidance.</p>
      </section>`
  },
  "how-to-get-work-done-when-you-have-too-much-to-do": {
    title: "4 Ways to Get Real Work Done When You Already Have Too Much to Do",
    description: "Discover four practical ways to get real work done when you have too much to do: reset the overload, start smaller, protect focus, and negotiate trade-offs.",
    dek: "Four practical ways to stop reacting, decide what matters, and make meaningful progress without working yourself into the ground.",
    image: "https://www.luzora.app/assets/images/blog/overloaded-work/cover.png?v=20260830-textless",
    dateLabel: "August 30, 2026",
    readTime: "7 min read",
    datePublished: "2026-08-30T09:00:00+01:00",
    dateModified: "2026-08-30T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["feeling overwhelmed", "too much to do", "prioritizing work", "time management", "focus", "workload management"],
    bodyHtml: `
      <div class="article-lead is-revealed" data-article-section>
        <p>It is 9:07 in the morning. You open your laptop with good intentions, see three messages marked urgent, remember the report you did not finish yesterday, and notice the tab for the course you promised yourself you would continue.</p>
        <p>So you answer one message. Then another. You check the report, jump into a meeting, return to your inbox, and spend the rest of the day moving quickly. By evening, you are tired—but the work that mattered most is still waiting.</p>
        <p>If that feels familiar, the problem is probably not laziness. You are trying to make decisions while carrying too many open commitments in your head.</p>
        <p>When you already have too much to do, the answer is not to become faster at doing everything. It is to reduce the number of things competing for this moment, choose one useful result, and make starting it easy.</p>
      </div>
      <section class="article-section is-revealed" id="quick-answer" data-article-section>
        <h2>The short answer</h2>
        <p>When you have too much to do, stop reacting for 20 minutes. Write down every open commitment, separate real consequences from noise, remove or renegotiate work that does not fit, choose one meaningful outcome for today, and give it a protected place on your calendar. Then define the first action so clearly that you can begin without another decision.</p>
        <p>That small reset will not make the workload disappear. It will stop the workload from deciding your day for you.</p>
        <p class="article-callout">You do not need to finish everything today. You need to know what deserves today.</p>
      </section>
      <section class="article-section is-revealed" id="why-busy-days-produce-so-little" data-article-section>
        <h2>Why a busy day can still produce so little</h2>
        <p>An overloaded day makes every request feel equally important. It is not. Research on the <a href="https://academic.oup.com/jcr/article-abstract/45/3/673/4847790" target="_blank" rel="noopener noreferrer">mere urgency effect</a> found that people often choose urgent tasks over more important ones—even when the urgent task has a smaller payoff.</p>
        <p>Switching constantly has a cost too. When you leave one unfinished task for another, part of your attention can remain stuck on the first one. Researchers call this <a href="https://www.sciencedirect.com/science/article/pii/S0749597809000399" target="_blank" rel="noopener noreferrer">attention residue</a>. In ordinary language: your hands have moved to the next task, but a piece of your mind has not.</p>
        <p>This is why doing a little of twelve things can feel exhausting while creating very little progress. The goal is not to squeeze more activity into the day. It is to create fewer, cleaner decisions.</p>
      </section>
      <section class="article-section is-revealed" id="the-20-minute-overload-reset" data-article-section>
        <h2>1. Reset the overload before you do more</h2>
        <p>Imagine pausing that frantic morning before answering the next message. Take a sheet of paper, open a plain note, or use whatever task tool you already trust. Set a timer for 20 minutes.</p>
        <p class="article-list-intro">Then work through these four steps:</p>
        <ol>
          <li>Capture for five minutes. Write down every promise, task, worry, follow-up, and half-finished job. Do not organise yet. Your first job is to stop using your memory as a storage room.</li>
          <li>Question the list for five minutes. For each item, ask: What happens if this waits? Who is affected? Is the deadline real, assumed, or self-imposed? A task with no meaningful consequence may not deserve today.</li>
          <li>Match the work to reality for five minutes. Look at the hours you actually have after meetings, care work, meals, and rest. If the work does not fit, choose what to delay, decline, delegate, shorten, or renegotiate. A crowded calendar cannot be repaired by optimism.</li>
          <li>Choose today's win for five minutes. Complete this sentence: If only one useful thing moves forward today, it will be ____. Pick an outcome, not a vague activity. “Send the proposal” is clearer than “work on proposal.”</li>
        </ol>
        <p>Planning also helps your mind release unfinished work. In one set of studies, making a specific plan reduced the mental interference caused by uncompleted goals. You can read the <a href="https://pubmed.ncbi.nlm.nih.gov/21688924/" target="_blank" rel="noopener noreferrer">research on plan-making and unfinished goals</a> if you want to explore why this works.</p>
      </section>
      <section class="article-section is-revealed" id="make-the-first-step-almost-too-easy" data-article-section>
        <h2>2. Make the first step almost too easy</h2>
        <p>A task such as “finish the presentation” still asks your brain to solve several problems before it can begin. Which file? Which section? What does finished mean? That uncertainty creates friction.</p>
        <p>Shrink the entry point until it looks almost boring: “Open the client deck and write the three slide headings.” Once you begin, the next step is easier to see.</p>
        <p>Now give the action a time and place: “At 10:00, after this call, I will close my inbox, open the client deck, and write the three headings.” Psychologists call this an implementation intention. A large review of the evidence found that these <a href="https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes" target="_blank" rel="noopener noreferrer">if-then plans can improve goal achievement</a>.</p>
        <p>You are not trying to feel motivated first. You are removing the decisions that normally stand between you and the start.</p>
      </section>
      <section class="article-section is-revealed" id="build-a-short-runway-for-focus" data-article-section>
        <h2>3. Build a short runway for focused work</h2>
        <p>You do not need a perfect two-hour morning routine. Start with one protected block of 25 to 45 minutes.</p>
        <p>Put the block on your calendar. Open only what the task needs. Silence the one interruption most likely to pull you away. Keep a small “not now” note nearby; when another thought appears, park it there instead of following it.</p>
        <p>If you must stop before the work is done, leave yourself a return note: “Next: compare the two price options and write the recommendation.” Research suggests that a <a href="https://pubsonline.informs.org/doi/abs/10.1287/orsc.2017.1184" target="_blank" rel="noopener noreferrer">ready-to-resume plan</a> can make it easier to switch away without carrying as much unfinished work into the next task.</p>
        <p>The point is not heroic concentration. It is making your return cheap. When the right file, page, and next action are easy to find, you spend less energy reconstructing your intention.</p>
      </section>
      <section class="article-section is-revealed" id="protect-your-plan-with-a-simple-script" data-article-section>
        <h2>4. Protect your plan by making trade-offs visible</h2>
        <p>New work will still arrive. Instead of accepting it silently and hoping the day stretches, make the trade-off visible.</p>
        <p>Try saying: “I can take this on. I am currently finishing the proposal for 3 PM. Which should come first?” Or: “I cannot finish both well today. I can send a shorter version by 4 PM or the complete version tomorrow morning. Which is more useful?”</p>
        <p>That is not being difficult. It is honest planning. When everything is called a priority, ask the person assigning the work to choose the consequence with you.</p>
        <p class="article-callout">A new yes should come with a clear decision about what moves.</p>
      </section>
      <section class="article-section is-revealed" id="when-the-problem-is-bigger-than-productivity" data-article-section>
        <h2>When the problem is bigger than productivity</h2>
        <p>Sometimes the list is not disorganised; it is simply too large. No morning routine can make one person sustainably do the work of three.</p>
        <p>If you regularly work late, cannot recover after rest, miss important tasks despite careful planning, or face more fixed commitments than available hours, treat that as a capacity problem. Bring evidence to the conversation: the work requested, the time available, the likely trade-offs, and your recommendation about what should pause.</p>
        <p>A useful sentence is: “Here is what fits this week, here is what does not, and here is the order I recommend.” Productivity should help you use your capacity well. It should not teach you to ignore your limits.</p>
      </section>
      <section class="article-section is-revealed" id="a-gentler-way-to-end-the-day" data-article-section>
        <h2>A gentler way to end the day</h2>
        <p>At the end of the day, do not judge yourself by the number of boxes you touched. Ask three questions: What moved? What did I learn? What is the next visible action for tomorrow?</p>
        <p>Then close the loop. Record the next step, save the place where the work continues, and let the rest of the list wait in a system you trust.</p>
        <p>Tomorrow may still be full. But it will not have to begin with twelve competing voices. It can begin with one clear return.</p>
        <p class="article-callout">Less reacting. Fewer open loops. One meaningful piece of progress at a time.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions" data-article-section>
        <h2>Common questions when you feel overwhelmed</h2>
        <p>Where should I start when everything feels important? Start with consequences. Choose the task whose delay creates the most meaningful harm—or whose completion unlocks the most useful progress.</p>
        <p>How many priorities should I have today? Keep one main outcome and, if capacity allows, one or two smaller commitments. A list of ten priorities is still just a list.</p>
        <p>What if urgent requests keep interrupting me? Ask who is affected, what the real deadline is, and what should move if you accept the request. Genuine emergencies survive those questions; manufactured urgency usually becomes negotiable.</p>
      </section>`
  },
  "meet-luzora-return-to-what-matters": {
    title: "Meet Luzora: The tool that brings you back to what matters",
    description: "Meet Luzora, the tool that helps you return to the right place at the right time, follow through on what matters, and build consistency with The Hive.",
    image: "https://www.luzora.app/assets/images/blog/introducing-luzora/cover.webp",
    datePublished: "2026-08-24T12:00:00+01:00",
    dateModified: "2026-08-24T12:00:00+01:00"
  },
  "luzora-v1-0-6-faster-safer-smarter": {
    title: "Luzora v1.0.6 is live: Faster, safer, and smarter",
    description: "See what is new in Luzora v1.0.6, including Dynamic Context Preview, faster Home loading, task search, safe bulk deletion, stronger sync, smarter capture, and more reliable reminders.",
    image: "https://www.luzora.app/assets/brand-kit/social/open-graph/luzora-v1-0-6-product-update-og.png",
    datePublished: "2026-08-11T12:00:00+01:00",
    dateModified: "2026-08-11T12:00:00+01:00"
  },
  "luzora-v1-0-5-return-to-the-right-page": {
    title: "Luzora v1.0.5: Return to the Right Page at the Right Time",
    description: "See what is new in Luzora v1.0.5, including Smart Return, Auto Return, live countdowns, multiple reminders, improved scheduling, and more reliable browser tasks.",
    image: "https://www.luzora.app/assets/brand-kit/social/luzora-v1-0-5-product-update.png",
    datePublished: "2026-08-01T12:00:00+01:00",
    dateModified: "2026-08-01T12:00:00+01:00"
  },
  "hive-report-01-luzora-goes-public": {
    title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
    description: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
    image: "https://www.luzora.app/assets/brand-kit/social/hive-report-01.png?v=20260726-transparent",
    datePublished: "2026-07-26T18:00:00+01:00",
    dateModified: "2026-07-26T18:00:00+01:00"
  },
  "referral-system-is-live-invite-your-hive": {
    title: "Referral System Is Live: Invite Your Hive",
    description: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
    image: "https://www.luzora.app/assets/brand-kit/social/referral-system-article-preview.png",
    datePublished: "2026-07-21T09:00:00+01:00",
    dateModified: "2026-07-21T09:00:00+01:00"
  },
  "help-shape-luzora-private-testing-is-opening": {
    title: "Help shape Luzora: Private testing is opening",
    description: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
    image: "https://www.luzora.app/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif",
    datePublished: "2026-07-18T09:00:00+01:00",
    dateModified: "2026-07-18T09:00:00+01:00"
  }
};

const templatePath = path.join(process.cwd(), "blog-article.html");

function escapeAttribute(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = function handler(request, response) {
  const rawSlug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : "";

  if (!Object.prototype.hasOwnProperty.call(ARTICLES, slug)) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("X-Robots-Tag", "noindex");
    response.status(404).send("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>Article not found | Luzora</title></head><body><main><h1>Article not found</h1><p>This Luzora Journal article does not exist.</p><p><a href=\"/blog\">Return to The Hive Journal</a></p></main></body></html>");
    return;
  }

  const article = ARTICLES[slug];
  const title = escapeAttribute(article.title);
  const description = escapeAttribute(article.description);
  const image = escapeAttribute(article.image);
  const canonical = `https://www.luzora.app/blog/${slug}`;
  const articleBody = stripHtml(article.bodyHtml);
  const structuredDataGraph = [{
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    mainEntityOfPage: canonical,
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    articleSection: article.articleSection,
    keywords: article.keywords,
    articleBody: articleBody || undefined,
    wordCount: articleBody ? articleBody.split(/\s+/).length : undefined,
    author: {
      "@type": "Organization",
      name: "Luzora Team",
      url: "https://www.luzora.app/"
    },
    publisher: {
      "@id": "https://www.luzora.app/#organization"
    },
    isPartOf: {
      "@id": "https://www.luzora.app/blog#blog"
    },
    inLanguage: "en-US"
  }];

  if (Array.isArray(article.faqs) && article.faqs.length) {
    structuredDataGraph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: article.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  const articleStructuredData = serializeJsonLd({
    "@context": "https://schema.org",
    "@graph": structuredDataGraph
  });

  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replace("<title>Luzora Journal Article</title>", `<title>${title} | Luzora</title>`)
    .replace('<link rel="canonical" href="https://www.luzora.app/blog" />', `<link rel="canonical" href="${canonical}" />`)
    .replace('<meta name="description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="description" content="${description}" />`)
    .replace('<meta property="og:title" content="Luzora Journal Article" />', `<meta property="og:title" content="${title}" />`)
    .replace('<meta property="og:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta property="og:description" content="${description}" />`)
    .replace('<meta property="og:url" content="https://www.luzora.app/blog" />', `<meta property="og:url" content="${canonical}" />`)
    .replace('<meta property="og:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta property="og:image" content="${image}" />`)
    .replace('<meta property="article:published_time" content="2026-07-21T09:00:00+01:00" />', `<meta property="article:published_time" content="${article.datePublished}" />`)
    .replace('<meta name="twitter:title" content="Luzora Journal Article" />', `<meta name="twitter:title" content="${title}" />`)
    .replace('<meta name="twitter:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="twitter:description" content="${description}" />`)
    .replace('<meta name="twitter:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta name="twitter:image" content="${image}" />`)
    .replace('<span data-article-breadcrumb>Blog title</span>', `<span data-article-breadcrumb>${title}</span>`)
    .replace('<h1 data-article-title>Welcome to Luzora Field Notes</h1>', `<h1 data-article-title>${title}</h1>`)
    .replace('<p data-article-dek>Stay up to date with the latest announcements, and news from Luzora.</p>', `<p data-article-dek>${escapeAttribute(article.dek || article.description)}</p>`)
    .replace('<span data-article-date>May 18, 2026</span>', `<span data-article-date>${escapeAttribute(article.dateLabel || "")}</span>`)
    .replace('<span data-article-read>5 min read</span>', `<span data-article-read>${escapeAttribute(article.readTime || "")}</span>`)
    .replace('<div class="article-body" data-article-body></div>', `<div class="article-body" data-article-body>${article.bodyHtml || ""}</div>`)
    .replace("<!-- ARTICLE_STRUCTURED_DATA -->", `<script type="application/ld+json">${articleStructuredData}</script>`);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).send(html);
};
