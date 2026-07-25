import type { Event } from '../models/event';

export interface ScriptOptions {
  talkingPoints?: {
    announcements?: string;
    sponsorShoutout?: string;
    communityReminders?: string;
    specialInstructions?: string;
  };
  nextEvent?: Event;
}

export interface ScriptSection {
  id: number;
  title: string;
  text: string;
}

export interface SpeakerInfo {
  names: string;
  hasSpeaker: boolean;
  isPlural: boolean;
}

/**
 * Parses and returns detailed speaker metadata from the event title and description.
 */
/**
 * Helper to validate if an extracted string contains a likely human speaker name,
 * filtering out common technical terminology or brand names.
 */
function isValidSpeakerName(name: string): boolean {
  const lowercase = name.toLowerCase();
  const blacklist = [
    'google',
    'firebase',
    'android',
    'flutter',
    'chrome',
    'tensorflow',
    'generative',
    'cloud',
    'machine',
    'intelligence',
    'gemini',
    'vertex',
    'web',
    'dev',
    'developer',
    'designer',
    'engineer',
    'ai',
    'framework',
    'companion',
    'workshop',
    'showcase',
    'meetup',
    'event',
    'session',
  ];
  return !blacklist.some((word) => lowercase.includes(word));
}

/**
 * Parses and returns detailed speaker metadata from the event title and description.
 */
export function getSpeakerInfo(event: Event): SpeakerInfo {
  const title = event.title;

  // 1. Large Event / Conference Override
  const largeEventKeywords = [
    'DevFest',
    'Hackathon',
    'GemJam',
    'Code Camp',
    'Day of Data',
    'Summit',
  ];
  const isLargeEvent = largeEventKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );
  if (isLargeEvent) {
    return {
      names: 'our speakers',
      hasSpeaker: true,
      isPlural: true,
    };
  }

  // 2. Search description for "Speaker: Name", "Presenter: Name", "Presented by Name", or "with Name"
  const textContent =
    `${event.descriptionShort || ''} ${event.description || ''}`.replace(
      /<[^>]*>/g,
      ' '
    );
  const descSpeakerMatch = textContent.match(
    /(?:speaker|presenter|presented\s+by|with)\s+:?\s+([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+(?:\s*(?:and|&|,)\s*[A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)*)/i
  );
  if (descSpeakerMatch && descSpeakerMatch[1]) {
    const extractedNames = descSpeakerMatch[1].trim();
    if (isValidSpeakerName(extractedNames)) {
      const isPlural = /\s+(?:and|&)\s+|,/.test(extractedNames);
      return {
        names: extractedNames,
        hasSpeaker: true,
        isPlural,
      };
    }
  }

  // 3. Search for Colon or Dash Speaker format: Name: Topic or Name - Topic
  const colonDashMatch = title.match(
    /^([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+(?:\s*(?:and|&|,)\s*[A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)*)\s*[:|-]\s*(.*)$/
  );
  if (colonDashMatch && colonDashMatch[1]) {
    const extractedNames = colonDashMatch[1].trim();
    if (isValidSpeakerName(extractedNames)) {
      const isPlural = /\s+(?:and|&)\s+|,/.test(extractedNames);
      return {
        names: extractedNames,
        hasSpeaker: true,
        isPlural,
      };
    }
  }

  // 4. Search for patterns like "with [Name] and [Name]"
  const withMultipleMatch = title.match(
    /with\s+([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)\s+(?:and|&)\s+([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)/
  );
  if (withMultipleMatch && withMultipleMatch[1] && withMultipleMatch[2]) {
    const extracted = `${withMultipleMatch[1]} and ${withMultipleMatch[2]}`;
    if (isValidSpeakerName(extracted)) {
      return {
        names: extracted,
        hasSpeaker: true,
        isPlural: true,
      };
    }
  }

  // 5. Search for "with [Name]"
  const withSingleMatch = title.match(
    /with\s+([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)/
  );
  if (withSingleMatch && withSingleMatch[1]) {
    if (isValidSpeakerName(withSingleMatch[1])) {
      return {
        names: withSingleMatch[1],
        hasSpeaker: true,
        isPlural: false,
      };
    }
  }

  // 6. Search for "presented by [Name]" in the title
  const presentedByMatch = title.match(
    /presented\s+by\s+([A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+(?:\s*(?:and|&|,)\s*[A-Z][a-zA-Z'-]+\s+[A-Z][a-zA-Z'-]+)*)/i
  );
  if (presentedByMatch && presentedByMatch[1]) {
    const extractedNames = presentedByMatch[1].trim();
    const isPlural = /\s+(?:and|&)\s+|,/.test(extractedNames);
    return {
      names: extractedNames,
      hasSpeaker: true,
      isPlural,
    };
  }

  // 7. Detect community/non-speaker events based on title keywords
  const communityKeywords = [
    'showcase',
    'networking',
    'mixer',
    'social',
    'hackathon',
    'meetup',
    'lightning talks',
    'open mic',
    'study group',
    'co-working',
    'discussion',
    'career',
    'board game',
    'casual',
    'study jam',
    'show and tell',
    'meet & greet',
    'meet and greet',
    'jam',
    'demo day',
    'party',
    'kick-off',
    'coffee',
    'camp',
    'celebration',
  ];

  const isCommunity = communityKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (isCommunity) {
    return {
      names: 'our community presenters',
      hasSpeaker: false,
      isPlural: true,
    };
  }

  // Default fallback (contextual names based on event type)
  let fallbackNames = 'our guest speaker';
  if (title.toLowerCase().includes('workshop')) {
    fallbackNames = 'our workshop facilitator';
  } else if (
    title.toLowerCase().includes('study jam') ||
    title.toLowerCase().includes('course') ||
    title.toLowerCase().includes('study group')
  ) {
    fallbackNames = 'our study group leader';
  }

  return {
    names: fallbackNames,
    hasSpeaker: true,
    isPlural: false,
  };
}

/**
 * Safely parses basic Markdown formatting (**bold**, *italic*, [link](url)) into clean HTML.
 */
export function parseMarkdown(text: string): string {
  if (!text) return '';

  // 1. Escape HTML special characters to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Bold: **text** or __text__
  html = html.replace(
    /(\*\*|__)(.*?)\1/g,
    '<strong class="font-extrabold text-on-surface">$2</strong>'
  );

  // 3. Italic: *text* or _text_
  html = html.replace(/(\*|_)(.*?)\1/g, '<em class="italic">$2</em>');

  // 4. Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    let href = url.trim();
    if (
      !/^https?:\/\//i.test(href) &&
      !href.startsWith('/') &&
      !href.startsWith('mailto:')
    ) {
      href = `https://${href}`;
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary font-bold underline hover:opacity-80">${linkText}</a>`;
  });

  // 5. Bullet Points: Lines starting with "- ", "* ", or "• "
  html = html.replace(
    /^(?:[-*•])\s+(.+)$/gm,
    '<span class="flex items-start gap-2 py-0.5"><span class="text-primary font-bold shrink-0 select-none">•</span><span>$1</span></span>'
  );

  // Clean up trailing newlines immediately following bullet spans to prevent double-spacing
  html = html.replace(/(<\/span>)\n+/g, '$1');

  return html;
}

/**
 * Generates the 7 structured sections of the presenter intro script.
 */
export function generateIntroSections(
  event: Event,
  options: ScriptOptions = {}
): ScriptSection[] {
  const speakerInfo = getSpeakerInfo(event);
  const startDate = new Date(event.startDate);

  // Dynamic day of week and time of day greeting
  const dayOfWeek = startDate.toLocaleDateString('en-US', { weekday: 'long' });
  const hours = startDate.getHours();
  const timeOfDay =
    hours < 12 ? 'morning' : hours < 18 ? 'afternoon' : 'evening';

  const greetingText = `Good ${timeOfDay}, everyone! 👋\n\nWelcome to **GDG Central Florida**, and thank you all for spending part of your ${dayOfWeek} with us. Whether this is your first meetup or you've been coming for years, we're really glad you're here.`;

  // Announcements block
  const userAnnouncements = options.talkingPoints?.announcements?.trim();
  const announcementsText = userAnnouncements
    ? `Before we get started, I want to share a few quick announcements.\n\n• ${userAnnouncements.split('\n').join('\n• ')}`
    : `Before we get started, I want to share a few quick announcements.`;

  // Community & Discord
  const communityDiscordText = `First, we'd love for you to join our **GDG Central Florida Discord**. It's where our community stays connected between meetups, shares projects, asks questions, and learns from one another. If you haven't joined yet, please do—we'd love to keep the conversation going after today's event.`;

  // Code of Conduct
  const codeOfConductText = `Second, a quick reminder that all of our events follow **Google's Community Code of Conduct**. We want everyone to feel welcome, respected, and safe.`;

  // Upcoming Events
  const upcomingText = options.nextEvent
    ? `We have some fantastic upcoming events scheduled. Make sure to RSVP for our next session: "**${options.nextEvent.title}**" on **${options.nextEvent.displayDate}**.`
    : `We have some fantastic upcoming events scheduled. Check our community page at gdg.community.dev to RSVP for our next session!`;

  // Event Overview & Intro
  const cleanDescription = event.descriptionShort
    ? event.descriptionShort.replace(/<[^>]*>/g, '')
    : 'a great learning session';

  const introPrefix =
    speakerInfo.isPlural && !speakerInfo.names.startsWith('our ')
      ? 'our speakers, '
      : '';

  const eventOverviewText = speakerInfo.hasSpeaker
    ? `Today, we are thrilled to welcome ${introPrefix}**${speakerInfo.names}**, who will be presenting "**${event.title}**". Here is a quick overview of what we'll cover:\n\n"${cleanDescription}"`
    : `Today, we are gathered for our community event, "**${event.title}**". Here is a quick overview of what's in store:\n\n"${cleanDescription}"`;

  // Closing / Welcome Speaker
  const closingText = speakerInfo.hasSpeaker
    ? `Let's give a warm welcome to **${speakerInfo.names}** and get started!`
    : `Let's get started with today's activities!`;

  return [
    { id: 1, title: 'Welcome & Thank You', text: greetingText },
    { id: 2, title: 'Announcements', text: announcementsText },
    { id: 3, title: 'Community & Discord', text: communityDiscordText },
    { id: 4, title: 'Code of Conduct', text: codeOfConductText },
    { id: 5, title: 'Upcoming Events', text: upcomingText },
    { id: 6, title: 'Event Overview & Intro', text: eventOverviewText },
    { id: 7, title: 'Kickoff & Welcome', text: closingText },
  ];
}

/**
 * Generates the dynamic presenter intro script.
 */
export function generateIntroScript(
  event: Event,
  options: ScriptOptions = {}
): string {
  const sections = generateIntroSections(event, options);
  return sections.map((s) => s.text).join('\n\n');
}

/**
 * Generates the 7 structured sections of the presenter outro script.
 */
export function generateOutroSections(
  event: Event,
  options: ScriptOptions = {}
): ScriptSection[] {
  const speakerInfo = getSpeakerInfo(event);

  const thankYouText = `Before everyone heads out, I'd like to say a huge thank you for joining us today.`;

  const outroPrefix =
    speakerInfo.isPlural && !speakerInfo.names.startsWith('our ')
      ? 'our speakers, '
      : '';

  const appreciationText = speakerInfo.hasSpeaker
    ? `First, let's give another round of applause to ${outroPrefix}**${speakerInfo.names}** for sharing their time, knowledge, and this fantastic session. 👏`
    : `First, let's give a round of applause to everyone who shared, presented, or participated in today's activities! 👏`;

  const venueThanksText =
    event.audienceType !== 'VIRTUAL' && event.venueName
      ? `I'd also like to thank **${event.venueName}** for hosting us and making today's meetup possible.\n\nI also want to give a special shout-out to our **volunteers** for their hard work in making everything run smoothly today.`
      : `I'd also like to thank our hosts and community partners for supporting today's event.\n\nI also want to give a special shout-out to our **volunteers** for their hard work in making everything run smoothly today.`;

  const communityThanksText = `Most importantly, thank all of you for being here. Whether you're a student, a seasoned developer, or just getting started with tech, you're what makes this community special. Every conversation, question, and connection helps make **GDG Central Florida** stronger.`;

  const discordReminderText = `If you haven't already, please join our **GDG Central Florida Discord**. It's where we continue the conversations, share resources, announce future events, and help each other grow.`;

  const upcomingEventsText = options.nextEvent
    ? `If you enjoyed today's meetup, we'd really appreciate it if you RSVP for our next session, "**${options.nextEvent.title}**" on **${options.nextEvent.displayDate}**, and invite a friend or coworker next time!`
    : `If you enjoyed today's meetup, we'd really appreciate it if you RSVP for one of our upcoming events at **gdg.community.dev** and invite a friend or coworker next time. The more people we bring together, the stronger our community becomes.`;

  const networkingClosingText = speakerInfo.hasSpeaker
    ? `Feel free to stick around for a bit, network, ask **${speakerInfo.names}** questions, and meet someone new before you leave.\n\nThank you again for spending part of your day with us. Have a safe trip home, and we hope to see you at our next GDG Central Florida event! 🚀`
    : `Feel free to stick around for a bit, network, chat with each other, and meet someone new before you leave.\n\nThank you again for spending part of your day with us. Have a safe trip home, and we hope to see you at our next GDG Central Florida event! 🚀`;

  return [
    { id: 1, title: 'Thank You', text: thankYouText },
    { id: 2, title: 'Appreciation', text: appreciationText },
    { id: 3, title: 'Venue & Volunteers', text: venueThanksText },
    { id: 4, title: 'Community Thanks', text: communityThanksText },
    { id: 5, title: 'Discord Reminder', text: discordReminderText },
    { id: 6, title: 'Upcoming Events', text: upcomingEventsText },
    { id: 7, title: 'Networking / Closing', text: networkingClosingText },
  ];
}

/**
 * Generates the dynamic presenter outro script.
 */
export function generateOutroScript(
  event: Event,
  options: ScriptOptions = {}
): string {
  const sections = generateOutroSections(event, options);
  return sections.map((s) => s.text).join('\n\n');
}
