import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Create jobs
  const jobs = [
    {
      title: 'Senior Software Engineer',
      description: 'We are looking for an experienced Senior Software Engineer to join our backend team. You will be responsible for building scalable microservices and integrating AI-driven features.',
      requirements: '- 5+ years of experience in Node.js/TypeScript.\n- Experience with Next.js and Prisma.\n- Strong understanding of system design.',
      keywords: 'Node.js, TypeScript, Next.js, Prisma, Backend, Microservices, System Design',
      isActive: true,
    },
    {
      title: 'Frontend Developer',
      description: 'Join our frontend team to build modern, responsive, and beautiful user interfaces using React and Tailwind CSS.',
      requirements: '- 3+ years of experience with React.\n- Expertise in Tailwind CSS and modern CSS practices.\n- Experience with Next.js is a plus.',
      keywords: 'React, Tailwind CSS, Frontend, UI/UX, Next.js, JavaScript',
      isActive: true,
    },
    {
      title: 'Digital Marketing Manager',
      description: 'We are seeking a creative Digital Marketing Manager to lead our online presence and growth campaigns.',
      requirements: '- Proven experience in SEO, SEM, and social media marketing.\n- Ability to analyze data using Google Analytics.\n- Strong communication skills.',
      keywords: 'SEO, SEM, Social Media, Google Analytics, Marketing, Content Strategy',
      isActive: true,
    },
    {
      title: 'Product Designer (UI/UX)',
      description: 'Help us design the future of AI recruitment. We need a Product Designer with a sharp eye for aesthetics and user experience.',
      requirements: '- Strong portfolio showcasing web and mobile app designs.\n- Proficiency in Figma.\n- Understanding of user-centered design principles.',
      keywords: 'Figma, UI/UX, Product Design, Wireframing, Prototyping',
      isActive: true,
    }
  ];

  for (const job of jobs) {
    const createdJob = await prisma.job.create({
      data: job,
    });
    console.log(`Created job with id: ${createdJob.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
