import { StudySection } from './types';
import { tenMarkQuestions } from './ancientIndianComm10Marks';
import { tenMarkQuestionsPart2 } from './ancientIndianComm10MarksPart2';

export const ancientIndianCommData: StudySection[] = [
  {
    section: "SECTION 1: Foundations & Oral Traditions",
    items: [
      {
        q: "What is the Ancient Indian Communication System?",
        a: "Before modern mass media, Ancient India communicated knowledge, religion, and culture through a vast network of oral traditions, sacred scriptures, architecture, and performing arts. It was largely a pre-literate society, meaning information had to be passed down face-to-face.\n\nThis system successfully preserved scientific, philosophical, and literary knowledge with incredible accuracy across thousands of years. It shaped social structures and continues to influence modern Indian storytelling today.",
        diagram: `graph TD
  A[Ancient Communication] --> B(Oral Tradition)
  A --> C(Written & Literary)
  A --> D(Architectural & Visual)
  B --> B1(Guru-Shishya Parampara)
  C --> C1(Epics & Treatises)
  D --> D1(Temples, Forts, Stupas)`
      },
      {
        q: "The Oral Tradition and The Vedas",
        a: "The oral tradition was the absolute backbone of ancient communication. Knowledge was passed from Guru to Shishya through strict memorization, repetition, and recitation.\n\nThe most famous examples are the Vedas, which were classified as 'Shruti'—meaning 'that which is heard'. For thousands of years before they were ever written down, scholars used extreme mnemonic techniques to memorize them. These methods cross-checked the text in multiple ways to ensure that every single syllable was preserved with complete accuracy.",
        diagram: `flowchart LR
  G[Guru] -- Dictates --> M[Memorization Techniques]
  M -- Recitation --> S[Shishya / Student]
  S -- Preserves --> N[Next Generation]`
      },
      {
        q: "Values, Rhetoric, and Debate",
        a: "Ancient communication wasn't just about sharing facts; it was deeply tied to a moral value system based on Dharma, Satya (truth), and Ahimsa (non-violence). Texts like the Manusmriti advised that speech should always be truthful, pleasant, and beneficial to the listener.\n\nBeyond moral speech, Rhetoric—the art of persuasive speaking—was crucial. Scholars and kings used logical debate (Vada) to resolve disputes, defend philosophical positions, and maintain authority."
      },
      {
        q: "Performing Arts and The Natya Shastra",
        a: "When pure text or philosophy was too complex for common audiences, performing arts stepped in. Dance, drama, and music combined visual spectacle with emotional narratives to teach religion and morality.\n\nThe 'Natya Shastra', written by Bharata Muni, is the ultimate ancient guidebook on this. It covers stagecraft, gestures called Mudras, and music. Its most important concept is 'Rasa', or aesthetic emotion. The idea is that a performance must evoke specific emotions in the audience to effectively communicate deeper spiritual truths."
      }
    ]
  },
  {
    section: "SECTION 2: Scriptural & Literary Communication",
    items: [
      {
        q: "The Great Epics: Ramayana and Mahabharata",
        a: "The epics acted as massive, engaging communication tools. Instead of boring people with abstract rules, they used epic narratives to teach ethics, politics, and family values.\n\nThe Ramayana emphasized duty, loyalty, and righteous conduct through the story of Rama. The Mahabharata explored complex moral dilemmas, warfare, and leadership, famously including the Bhagavad Gita—a masterpiece of philosophical dialogue between Krishna and Arjuna. These epics spread far beyond India, heavily influencing the culture of Southeast Asia."
      },
      {
        q: "Puranas, Buddhist, and Jain Literature",
        a: "While the Vedas were rigid and strict, the Puranas were flexible and highly accessible. They contained stories of gods, kings, and mythology, communicated by traveling bards to ordinary people.\n\nSimilarly, Buddhist and Jain literature played a huge role. The Buddhist 'Jataka Tales' used simple stories about the past lives of the Buddha to teach moral lessons like compassion and non-violence. Jain texts heavily emphasized spiritual development and self-discipline."
      },
      {
        q: "Treatises (Shastras) and Languages",
        a: "A treatise, or Shastra, is a systematic written guide on a specific subject. Ancient India didn't just write about religion; they wrote treatises on politics, economics, and medicine. The 'Arthashastra' by Chanakya is a prime example, acting as a masterclass in statecraft, diplomacy, and espionage.\n\nAll of this was made possible by highly structured languages. Sanskrit became the elite language of philosophy and science thanks to its strict grammar, while Pali and Prakrit were used to communicate with the regional masses."
      }
    ]
  },
  {
    section: "SECTION 3: Visual & Architectural Communication",
    items: [
      {
        q: "Architecture as Mass Media",
        a: "In a society where many people couldn't read, buildings became the ultimate mass media. Temples, stupas, and forts weren't just functional; they communicated power, religion, and culture permanently.\n\nTemples communicated religious cosmology through their layout and carvings. Forts communicated massive military strength, wealth, and territorial authority. Stupas, like the one at Sanchi, communicated Buddhist teachings visually through intricately carved gateways that anyone could understand.",
        diagram: `mindmap
  root((Architectural
  Communication))
    Temples
      Religious Cosmology
      Sacred Spaces
      Ritual Pathways
    Forts
      Political Power
      Military Strength
      Security
    Stupas
      Buddhist Teachings
      Jataka Tales
      Visual Symbols`
      },
      {
        q: "Rock-Cut Caves and Visual Storytelling",
        a: "Rock-cut architecture, like the Ajanta and Ellora caves, combined architecture, sculpture, and painting into one massive storytelling medium.\n\nThe Ajanta caves are famous for their vibrant Buddhist murals. These paintings visually communicated Jataka tales, royal life, and human emotions. It allowed complex narratives to be understood purely through images, functioning very much like early comic books or storyboards."
      },
      {
        q: "Sculptures, Mudras, and Inscriptions",
        a: "Sculpture was an essential visual language. By looking at a sequence of carved panels, viewers could read an entire story from conflict to resolution.\n\nThey heavily relied on 'Mudras', which are specific hand gestures that convey non-verbal meanings like blessing, protection, or fearlessness. On top of this, kings used inscriptions—like the famous Ashokan Pillars—to carve royal policies, laws, and moral codes into rocks and metal plates, ensuring their messages lasted for centuries."
      },
      {
        q: "Modern Relevance of Ancient Communication",
        a: "Ancient Indian communication is not a dead subject; it heavily influences our modern media. The concept of 'Rasa' still drives modern Indian cinema and storytelling. The ancient tradition of debate (Vada) mirrors today's journalism.\n\nFurthermore, visual symbols like the lotus or chakra remain central to modern branding and logos. From television adaptations of the epics to digital heritage projects, the ancient methods of transmitting culture are still very much alive."
      }
    ]
  },
  {
    section: "SECTION 4: 5-Mark Exam Questions (Full Length)",
    items: [
      {
        q: "Q1. Define Ancient Indian Communication and explain its significance.",
        a: "Ancient Indian Communication refers to the oral, written, symbolic, and performative practices through which knowledge, religion, culture, and social values were shared and preserved in India from the Vedic to the classical period. It included chanting, storytelling, debate, drama, sculpture, and inscriptions, working together in a largely pre-literate society.\n\nIts significance lies in preserving vast bodies of religious, scientific, and literary knowledge with remarkable accuracy across thousands of years, shaping Indian social structures, art, and philosophy. It also continues to influence contemporary Indian storytelling, pedagogy, and communication styles."
      },
      {
        q: "Q2. Write a short note on Rhetoric in Ancient Indian Communication.",
        a: "Rhetoric, the art of persuasive and effective speech, played a key role in Ancient India, seen in texts like the Natya Shastra and Arthashastra and in the tradition of philosophical debate (Vada/Shastrartha) rooted in Nyaya logic. It relied on clarity, analogy, metaphor, and emotional appeal, drawing from the broader Sanskrit tradition of Alankara Shastra (rhetorical embellishment).\n\nRhetoric was essential for teaching, governance, and diplomacy — kings and scholars used persuasive speech to maintain authority, resolve disputes, and defend philosophical positions, making it central to both intellectual and political life."
      },
      {
        q: "Q3. Explain the importance of the value system in Ancient Indian Communication.",
        a: "Ancient Indian communication was deeply tied to a value system centered on dharma (duty), satya (truth), and ahimsa (non-violence), reflecting the belief that speech was sacred and carried moral responsibility. Texts like the Manusmriti advised that speech should be satya, priya, and hita — truthful, pleasant, and beneficial to the listener.\n\nThese values shaped not just content but also communication style, guiding respectful address between different social roles (teacher-student, elder-younger) and embedding moral lessons directly into popular narratives like the Panchatantra, ensuring communication served ethical and social harmony, not just information transfer."
      },
      {
        q: "Q4. Write a short note on Vedas as a form of oral communication.",
        a: "The Vedas, classified as Shruti (“that which is heard”), were composed and transmitted purely through oral recitation for thousands of years before being written down. Ancient scholars developed extraordinary mnemonic techniques — such as Pada Patha, Krama Patha, and Ghana Patha — which cross-checked the text in multiple ways to preserve every syllable with complete accuracy.\n\nThis system, passed through the guru-shishya parampara, is considered one of the most remarkable achievements in oral communication history, ensuring the Vedas survived unchanged across millennia without relying on script."
      },
      {
        q: "Q5. Explain the role of Puranas in preserving and transmitting knowledge.",
        a: "The Puranas, classified as Smriti (“that which is remembered”), contain cosmology, mythology, genealogies of kings and sages, and moral teachings. Unlike the rigid recitation rules of the Vedas, Puranic tradition was more flexible, transmitted by sutas (bards) and storytellers directly to the general public.\n\nThis made complex religious and philosophical ideas accessible to ordinary people outside the Brahmanical educational system, playing a major role in popularizing religious knowledge, historical memory, and cultural values across broad sections of society."
      },
      {
        q: "Q6. Explain performing communication with reference to Dance, Drama and Music.",
        a: "Performing communication used dramatic, musical, and dance-based performance to convey religious and moral messages to audiences across all levels of literacy. It combined visual spectacle, emotional expression, and narrative to reach a wide public in ways that pure text could not.\n\nClassical dance and drama, often based on epic and puranic stories, communicated complex philosophy and social values in accessible, entertaining forms, while music (Sangeeta) added emotional depth, helping audiences connect with devotional, moral, or heroic themes central to the performance."
      },
      {
        q: "Q7. Define Scriptural and Literary Communication and its importance.",
        a: "Scriptural and Literary Communication refers to the written and textual traditions — epics, treatises, and structured languages like Sanskrit — that codified religious, philosophical, and social knowledge in a more permanent form than oral transmission alone, especially after the development of scripts like Brahmi.\n\nIts importance lies in enabling knowledge to be recorded, standardized, and preserved with far greater accuracy and reach than oral tradition, allowing complex ideas in law, governance, medicine, and philosophy to be systematically studied, debated, and passed down across centuries."
      },
      {
        q: "Q8. Write a short note on Temples, Stupas, and Forts as architectural communication.",
        a: "Temples, built according to Vastu Shastra principles, communicated religious cosmology through their layout, spire, and inner sanctum, symbolizing the journey from the material world toward the divine. Grand temple complexes demonstrated the wealth, piety, and political power of the kings who funded them.\n\nStupas, associated with Buddhism, communicated the Buddha’s teachings through their dome-shaped structure and carved gateways (toranas) depicting Jataka tales, serving as accessible visual teaching tools. Forts, by contrast, primarily communicated political and military power, showcasing a ruler’s administrative capability and defensive strength through massive scale and strategic design."
      }
    ]
  },
  {
    section: "SECTION 5: 10-Mark Exam Questions (Long Form)",
    items: [...tenMarkQuestions, ...tenMarkQuestionsPart2]
  }
];
