import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

type RouteName = 'home' | 'about' | 'services' | 'projects' | 'contact';

const pages: { label: string; route: RouteName; href: string }[] = [
    { label: 'Home', route: 'home', href: '#/home' },
    { label: 'About Us', route: 'about', href: '#/about' },
    { label: 'Our Services', route: 'services', href: '#/services' },
    { label: 'Projects', route: 'projects', href: '#/projects' },
    { label: 'Contact Us', route: 'contact', href: '#/contact' },
];

type Service = {
    number: string;
    title: string;
    summary: string;
    items: string[];
    featured?: boolean;
    details?: string;
    clientBenefit?: string;
};

const services: Service[] = [
    {
        number: '01',
        title: 'Quantity Surveying & Cost Management',
        summary: 'Cost advice, measurement, tendering and cost control to help clients make informed decisions and keep value in view.',
        details: 'At HOS Consult Limited, our Quantity Surveying & Cost Management services deliver unparalleled cost certainty for construction projects across Africa. With over 25 years of experience, we provide precise cost planning, from feasibility studies to final account settlement. Our RICS-accredited team prepares detailed Bills of Quantities (BoQ), conducts tender evaluations, and implements value engineering to optimize budgets without compromising quality. Using FIDIC and NIQS-compliant methodologies, we ensure financial clarity through lifecycle cost planning and contract administration. Whether it’s residential, commercial, or industrial projects like Banana Island Luxury Apartments, our expertise minimizes cost overruns and maximizes value. Our technology-driven tools enhance accuracy, offering clients transparent cost insights at every stage. We combine global standards with local expertise, ensuring your project stays on budget and on schedule. Trust HOS Consult for end-to-end cost management that drives project success.',
        items: ['Preliminary and detailed cost estimation', 'Preparation of Bills of Quantities (BoQ)', 'Tender documentation and evaluation', 'Lifecycle cost planning and control', 'Contract administration and value engineering', 'Final account settlement'],
        clientBenefit: 'Improved cost predictability, financial clarity, and assurance that resources are aligned with project goals.',
        featured: true,
    },
    {
        number: '02',
        title: 'Project Management',
        summary: 'Practical coordination from concept to completion, with clear oversight of project scope, decisions and progress.',
        details: 'HOS Consult’s Project Management services ensure seamless execution from concept to completion. Our experienced project managers integrate design, procurement, and construction, delivering projects on time, within budget, and to the highest quality. We conduct feasibility assessments, develop procurement strategies, and provide rigorous construction supervision, ensuring stakeholder alignment and risk mitigation. With a proven track record on projects like Banana Island Luxury Apartments, our RICS-accredited team leverages advanced tools for progress reporting and quality control. We blend global best practices with Nigeria’s local expertise, coordinating consultants and contractors to minimize surprises. Our client-centric approach emphasizes clear communication and accountability, ensuring your vision is realized. From commercial to industrial developments, HOS Consult drives project success with precision and innovation. Let us lead your project to exceptional outcomes.',
        items: ['Feasibility assessment and planning', 'Procurement and tendering strategies', 'Construction supervision and quality control', 'Progress reporting and stakeholder coordination', 'Risk management and mitigation planning'],
        clientBenefit: 'Seamless execution from start to finish, with clearer communication, stronger accountability, and fewer surprises.',
    },
    {
        number: '03',
        title: 'Lender Supervision & Development Advisory',
        summary: 'Project monitoring and development advice to support informed decisions and responsible oversight of construction investment.',
        details: 'HOS Consult’s Lender Supervision & Development Advisory services safeguard financial investments in construction projects. As independent monitors for banks, mortgage institutions, and private investors, we ensure project progress aligns with financing terms and developer commitments. Our expert team conducts thorough reviews of financial and project documents, performs site inspections, and verifies disbursements to mitigate risks. We provide detailed progress reports and valuations of completed works, offering real-time insights into project performance. With experience managing over $2 billion in projects, including MainOne Data Centre, we deliver advisory support for investment structuring, ensuring cost certainty and compliance. Our RICS-accredited professionals leverage global best practices, tailoring solutions to Nigeria’s unique market. From feasibility to completion, we reduce financial exposure and enhance stakeholder confidence. Choose HOS Consult for meticulous oversight and strategic advice that protects your investment.',
        items: ['Review of project and financial documents', 'Site progress inspections and reporting', 'Valuation of completed works', 'Disbursement verification and cost audits', 'Advisory support for investment structuring'],
        clientBenefit: 'Enhanced confidence in project delivery, reduced exposure to financial risks, and real-time insights into progress and performance.',
    },
    {
        number: '04',
        title: 'Arbitration & Claims Resolution',
        summary: 'Construction cost and contract expertise to help assess claims, clarify issues and support fair resolution.',
        details: 'Construction disputes can derail even the best-planned projects. HOS Consult’s Arbitration & Claims Resolution services provide clarity and equitable solutions to keep your project on track. Our expert team, led by professionals like Rhoda Warikubu, specializes in claims preparation, analysis, and forensic audits, ensuring contractual compliance and fair outcomes. We offer expert opinions and support arbitration processes, drawing on our 25+ years of experience in Nigeria’s construction industry. We combine global standards with local insights to resolve disputes efficiently, saving time and costs. From contractual disagreements to delay claims, our proactive approach minimizes disruptions and fosters collaboration. Whether you’re a developer or contractor, our NIQS and QSRBN-accredited team delivers tailored solutions for projects like luxury residential or industrial developments. Trust HOS Consult to navigate complex claims with precision and professionalism.',
        items: ['Claims preparation and analysis', 'Expert opinion and forensic audit', 'Contractual compliance assessments', 'Support in dispute resolution and arbitration processes'],
        clientBenefit: 'Time and cost savings through proactive issue resolution and expert dispute support.',
    },
    {
        number: '05',
        title: '5D BIM & 3D Model Quantification',
        summary: 'Model-based measurement that connects quantities and cost information to the evolving design.',
        items: ['Model quantification', 'Digital measurement', 'Cost information'],
    },
    {
        number: '06',
        title: 'Post-Contract Cost Management',
        summary: 'Financial oversight during construction, with clear records as work, valuations and decisions evolve.',
        items: ['Valuations', 'Change control', 'Cost reporting', 'Final accounts'],
    },
    {
        number: '07',
        title: 'Feasibility & Budget Advisory',
        summary: 'Test project assumptions early and understand the financial implications before committing capital.',
        items: ['Feasibility advice', 'Budget validation', 'Value options'],
    },
];

const projects = Array.from({ length: 6 }, (_, index) => ({
    number: String(index + 1).padStart(2, '0'),
}));

type TeamMember = {
    number: string;
    name: string;
    designation: string;
    credentials?: string;
    location?: string;
    article: string[];
    image?: string;
};

const team: TeamMember[] = [
    {
        number: '01',
        name: 'HAKEEM O. SMITH',
        credentials: 'FNIQS, FRICS, FNIM',
        designation: 'Director | Principal Partner',
        article: [
            'A Fellow of the Nigerian Institute of Quantity Surveyors and Fellow of the Royal Institution of Chartered Surveyors, with over 36 years of experience in building consultancy, construction, and project management, including 34 years post-professional registration. Extensive track record delivering high-value developments across data centres, commercial, hospitality, industrial, and residential sectors, both within Nigeria and internationally.',
            'As Director and Principal Partner, he oversees all projects undertaken by the firm, providing strategic direction, quality assurance, and final sign-off across every stage of delivery. Recognized for authoritative leadership in cost consultancy, arbitration, and dispute resolution, and for building long-standing client relationships built on trust and technical excellence.',
        ],
    },
    {
        number: '02',
        name: 'RHODA WARIKUBU',
        credentials: 'MBA, MNIQS, QSRBN',
        designation: 'Technical Director | Construction Cost Consultant',
        article: [
            'A seasoned Construction Cost Consultant and Quantity Surveyor with over 16 years of industry experience, including 10 years post-professional registration. Proven expertise in cost management, contract administration, procurement strategy, and project financial control across high-value commercial, residential, hospitality, mixed-use, and data centre developments.',
            'Currently serving as Technical Director, leading multidisciplinary technical teams and delivering projects with minimal cost overruns. Recognized for strategic leadership, value engineering expertise, and strong stakeholder engagement.',
        ],
    },
    {
        number: '03',
        name: 'LENIN A. ADEBALOGUN',
        credentials: 'MNIQS, QSRBN, MPMI',
        designation: 'Senior Procurement Specialist | Senior Quantity Surveyor',
        article: [
            'A Member of the Nigerian Institute of Quantity Surveyors with 15 years of experience in quantity surveying and procurement, including 9 years post-professional registration. Lenin strives to provide premium quality, excellent quantity surveying and procurement services through commitment, teamwork, integrity, and ethics.',
            'Specialises in procurement strategy and contract administration, with experience spanning hotels, commercial, industrial, mixed-use, and residential developments.',
        ],
    },
    {
        number: '04',
        name: 'JAMES O. OYENIYI',
        credentials: 'MNIQS, QSRBN',
        designation: 'Senior Quantity Surveyor | Construction Cost Consultant',
        location: 'Lagos, Nigeria',
        article: [
            'A Member of the Nigerian Institute of Quantity Surveyors and Chartered Quantity Surveyor registered with the Quantity Surveyors Registration Board of Nigeria, with 15 years of experience in building consultancy, construction, and project management, including 7 years post-professional registration. Has been involved with a wide range of projects across commercial, industrial, residential, institutional, and mixed-use developments nationwide.',
            'Brings strong technical grounding in cost management, procurement, and contract administration, with a track record of supporting the successful delivery of projects from feasibility through to final account.',
        ],
    },
    {
        number: '05',
        name: 'Name to be added',
        credentials: 'Member, NIQS | Member, RICS',
        designation: 'Quantity Surveyor | Construction Cost Consultant',
        location: 'Abuja, Nigeria',
        article: [
            'A Member of the Nigerian Institute of Quantity Surveyors and the Royal Institution of Chartered Surveyors, with 27 years of experience in building and infrastructure consultancy, contracting, and construction project management, including 15 years post-professional registration. Has been involved with a wide range of commercial, civil infrastructure, industrial, and residential projects within the country.',
            'Brings deep expertise in contract procurement, cost administration, and claims management, together with recognized strengths in arbitration, dispute resolution, and expert witness work.',
        ],
    },
    ...Array.from({ length: 3 }, (_, index) => ({
        number: String(index + 6).padStart(2, '0'),
        name: 'Name to be added',
        designation: 'Designation to be added',
        article: ['A short professional profile will be added here once the approved biography is provided.'],
    })),
];

const email = 'hosconsult@gmail.com';
const consultationLink = 'mailto:' + email + '?subject=Consultation%20request%20-%20HOS%20Consult';

function readRoute(): RouteName {
    const value = window.location.hash.replace(/^#\/?/, '');
    if (value === 'about' || value === 'services' || value === 'projects' || value === 'contact') return value;
    return 'home';
}

function BrandMark() {
    return (
        <a className="brand" href="#/home" aria-label="HOS Consult Limited home">
            <span className="brand-monogram" aria-hidden="true">HOS<span>.</span></span>
            <span className="brand-name">CONSULT<br />LIMITED</span>
        </a>
    );
}

function BuildingIllustration() {
    return (
        <div className="hero-art" aria-label="Abstract architectural line drawing">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-label label-top">COST / CLARITY</div>
            <div className="art-label label-bottom">BUILT ENVIRONMENT · LAGOS</div>
            <svg className="building-svg" viewBox="0 0 620 620" role="img" aria-labelledby="building-title">
                <title id="building-title">Architectural study in royal blue and orange</title>
                <defs>
                    <linearGradient id="tower-fill" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3155d9" stopOpacity=".12" />
                        <stop offset="100%" stopColor="#3155d9" stopOpacity=".02" />
                    </linearGradient>
                </defs>
                <circle cx="328" cy="294" r="207" fill="none" stroke="#cf6337" strokeWidth="1.5" strokeDasharray="3 10" />
                <path d="M93 478H530" stroke="#1b2b65" strokeWidth="1.5" />
                <path d="M123 478V367L217 323V478M217 478V248L329 192V478M329 478V280L425 231V478M425 478V347L508 310V478" fill="url(#tower-fill)" stroke="#1b2b65" strokeWidth="2" />
                <path d="M123 391L217 347M123 417L217 373M123 443L217 399M123 469L217 425M217 282L329 226M217 315L329 259M217 348L329 292M217 381L329 325M217 414L329 358M217 447L329 391M329 315L425 266M329 350L425 301M329 385L425 336M329 420L425 371M329 455L425 406M425 375L508 338M425 408L508 371M425 441L508 404M425 474L508 437" fill="none" stroke="#1b2b65" strokeWidth="1" opacity=".68" />
                <path d="M217 248L274 220L329 192M329 280L377 255L425 231M425 347L467 328L508 310" fill="none" stroke="#cf6337" strokeWidth="2" />
                <path d="M274 220V478M377 255V478M467 328V478" stroke="#1b2b65" strokeWidth="1" strokeDasharray="4 7" opacity=".55" />
                <circle cx="425" cy="231" r="7" fill="#cf6337" />
                <circle cx="217" cy="248" r="5" fill="#cf6337" />
            </svg>
            <div className="art-stamp"><span>HOS</span><small>EST. 1996</small></div>
        </div>
    );
}

function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: ReactNode; copy?: string; light?: boolean }) {
    return (
        <div className={'section-intro' + (light ? ' light' : '')}>
            <p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p>
            <h2>{title}</h2>
            {copy && <p className="section-copy">{copy}</p>}
        </div>
    );
}

function ServiceCards({ limit }: { limit?: number }) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (selectedService && !dialogRef.current?.open) dialogRef.current?.showModal();
        else if (!selectedService && dialogRef.current?.open) dialogRef.current.close();
    }, [selectedService]);

    function closeDialog() {
        setSelectedService(null);
    }

    return (
        <>
            <div className="service-grid">
                {services.slice(0, limit ?? services.length).map(service => (
                    <button
                        className={'service-card' + (service.featured ? ' service-featured' : '')}
                        key={service.number}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        aria-haspopup="dialog"
                        aria-label={'View details for ' + service.title}
                    >
                        <div className="service-card-top"><span>{service.number}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
                        <h3>{service.title}</h3>
                        <p>{service.summary}</p>
                        <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
                    </button>
                ))}
            </div>
            <dialog
                className="service-modal"
                ref={dialogRef}
                aria-labelledby="service-modal-title"
                onCancel={closeDialog}
                onClose={closeDialog}
                onClick={event => { if (event.target === event.currentTarget) closeDialog(); }}
            >
                {selectedService && (
                    <div className="service-modal-content">
                        <div className="service-modal-top">
                            <p className="eyebrow"><span className="eyebrow-dot" />SERVICE / {selectedService.number}</p>
                            <button className="service-modal-close" type="button" onClick={closeDialog} aria-label="Close service details"><X size={20} /></button>
                        </div>
                        <h2 id="service-modal-title">{selectedService.title}</h2>
                        <p className="service-modal-copy">{selectedService.details ?? selectedService.summary}</p>
                        <section className="service-modal-scope" aria-labelledby="service-modal-scope-title">
                            <p className="eyebrow" id="service-modal-scope-title">Our expertise includes</p>
                            <ul>{selectedService.items.map(item => <li key={item}>{item}</li>)}</ul>
                        </section>
                        {selectedService.clientBenefit && (
                            <section className="service-modal-benefit" aria-labelledby="service-modal-benefit-title">
                                <p className="eyebrow" id="service-modal-benefit-title">Client benefit</p>
                                <p>{selectedService.clientBenefit}</p>
                            </section>
                        )}
                    </div>
                )}
            </dialog>
        </>
    );
}

function ProjectCards() {
    return (
        <div className="project-grid">
            {projects.map(project => (
                <article className="project-card" key={project.number}>
                    <div className={'project-art project-art-' + project.number} aria-hidden="true">
                        <span className="project-art-circle" />
                        <span className="project-art-tower tower-a" />
                        <span className="project-art-tower tower-b" />
                        <span className="project-art-tower tower-c" />
                        <span className="project-art-ground" />
                        <span className="project-art-caption">HOS / PROJECT STUDY</span>
                    </div>
                    <div className="project-card-info">
                        <div className="project-card-meta"><span>PROJECT {project.number}</span><span>DETAILS TO BE ADDED</span></div>
                        <h3>Project title to be added</h3>
                        <p>Project type · location to be confirmed</p>
                        <div className="project-card-bottom"><span>Scope of service to be confirmed</span><span className="project-arrow"><ArrowUpRight size={16} /></span></div>
                    </div>
                </article>
            ))}
        </div>
    );
}

function TeamCards() {
    const [selectedPerson, setSelectedPerson] = useState<TeamMember | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (selectedPerson && !dialogRef.current?.open) dialogRef.current?.showModal();
        else if (!selectedPerson && dialogRef.current?.open) dialogRef.current.close();
    }, [selectedPerson]);

    function closeDialog() {
        setSelectedPerson(null);
    }

    return (
        <>
            <div className="team-grid">
                {team.map(person => (
                    <button
                        className="team-card"
                        key={person.number}
                        type="button"
                        onClick={() => setSelectedPerson(person)}
                        aria-haspopup="dialog"
                        aria-label={'View profile for ' + person.name + ', ' + person.designation}
                    >
                        <div className={'team-portrait portrait-' + person.number} aria-hidden="true"><span>{person.number}</span><i /></div>
                        <div className="team-meta"><span>TEAM MEMBER {person.number}</span><span>VIEW PROFILE ↗</span></div>
                        <h3>{person.name}</h3>
                        <p>{person.designation}</p>
                    </button>
                ))}
            </div>
            <dialog
                className="team-modal"
                ref={dialogRef}
                aria-labelledby="team-modal-title"
                onCancel={closeDialog}
                onClose={closeDialog}
                onClick={event => { if (event.target === event.currentTarget) closeDialog(); }}
            >
                {selectedPerson && (
                    <div className="team-modal-content">
                        <div className="team-modal-top">
                            <p className="eyebrow"><span className="eyebrow-dot" />HOS CONSULT / TEAM {selectedPerson.number}</p>
                            <button className="team-modal-close" type="button" onClick={closeDialog} aria-label="Close team profile"><X size={20} /></button>
                        </div>
                        <div className="team-modal-layout">
                            {selectedPerson.image ? (
                                <img className="team-modal-portrait" src={selectedPerson.image} alt={selectedPerson.name} />
                            ) : (
                                <div className={'team-modal-portrait team-modal-placeholder portrait-' + selectedPerson.number} aria-hidden="true"><span>{selectedPerson.number}</span><i /></div>
                            )}
                            <div className="team-modal-copy">
                                <p className="team-modal-designation">{selectedPerson.designation}</p>
                                <h2 id="team-modal-title">{selectedPerson.name}</h2>
                                {selectedPerson.credentials && <p className="team-modal-credentials">{selectedPerson.credentials}</p>}
                                {selectedPerson.location && <p className="team-modal-location">{selectedPerson.location}</p>}
                                <p className="team-modal-summary-label">Professional summary</p>
                                {selectedPerson.article.map((paragraph, index) => <p className="team-modal-article" key={index}>{paragraph}</p>)}
                            </div>
                        </div>
                    </div>
                )}
            </dialog>
        </>
    );
}

function HomePage() {
    return (
        <div className="page-view">
            <section className="hero section-wrap" id="top">
                <div className="hero-copy">
                    <p className="eyebrow"><span className="eyebrow-dot" />QUANTITY SURVEYING · PROJECT MANAGEMENT</p>
                    <h1>Build with<br /><em>cost clarity.</em></h1>
                    <p className="hero-lede">Expert cost and project advice for developments built to last.</p>
                    <p className="hero-description">HOS Consult helps developers and contractors make confident decisions from feasibility and cost planning to procurement, construction and final account.</p>
                    <div className="hero-actions">
                        <a className="button button-primary" href="#/contact">Request a consultation <ArrowUpRight size={17} /></a>
                        <a className="text-link" href="#/services">Explore our services <ArrowDown size={15} /></a>
                    </div>
                    <div className="hero-note"><span className="note-line" />Lagos-based · Serving the built environment since 1996</div>
                </div>
                <BuildingIllustration />
                <div className="hero-index"><span>01</span><span className="index-rule" /><span>05</span></div>
            </section>
            <section className="trust-strip" aria-label="Company at a glance">
                <div className="trust-inner">
                    <div><span className="trust-label">ESTABLISHED</span><strong>1996</strong></div>                    <div><span className="trust-label">BASED IN</span><strong>Lagos, Nigeria</strong></div>
                    <div><span className="trust-label">PRACTICE</span><strong>RICS-regulated firm</strong></div>
                    <div className="trust-statement">Cost expertise, applied with purpose.</div>
                </div>
            </section>
            <section className="about-section section-wrap section-pad" id="about">
                <div className="about-aside">
                    <p className="eyebrow"><span className="eyebrow-dot" />ABOUT HOS</p>
                    <div className="vertical-note">EST. 1996 <span /></div>
                </div>
                <div className="about-main">
                    <h2>Better projects begin with <em>better decisions.</em></h2>
                    <div className="about-columns">
                        <p>HOS Consult Limited is a Lagos-based firm of chartered quantity surveyors and project managers. Since 1996, the practice has supported clients in the built environment with construction cost engineering and economic advice.</p>
                        <p>We help clients understand costs early, plan procurement carefully and keep financial decisions visible as a project moves forward. Our work is grounded in the brief, the design and the value each client needs to protect.</p>
                    </div>
                    <a href="#/services" className="inline-link">How we support your project <ArrowRight size={16} /></a>
                </div>
                <div className="about-mark" aria-hidden="true"><span>H</span><i /></div>
            </section>
            <section className="services-section section-pad" id="services">
                <div className="section-wrap">
                    <div className="services-heading">
                        <SectionIntro eyebrow="OUR SERVICES" title={<>What do you want<br />to <em>build?</em></>} copy="Bring us in early, or ask us to support a project already underway. We bring cost and delivery decisions into focus." />
                        <div className="services-side-note"><span>01—05</span><p>One project team.<br />Clear advice at every stage.</p></div>
                    </div>
                    <ServiceCards limit={5} />
                    <div className="service-footnote"><span className="footnote-symbol">+</span><p>Every appointment is shaped around the project brief, client priorities and agreed scope of service.</p></div>
                </div>
            </section>
            <section className="approach-section section-wrap section-pad">
                <div className="approach-head">
                    <SectionIntro eyebrow="A CLEARER ROUTE FORWARD" title={<>From first estimate<br />to <em>final account.</em></>} />
                    <p className="approach-intro">Good cost management is an active part of project delivery. It starts with the right questions and continues as the design, procurement and construction work develops.</p>
                </div>
                <div className="approach-steps">
                    <article><span>01</span><h3>Understand the brief</h3><p>Clarify the project goals, constraints and decisions that shape the work.</p></article>
                    <article><span>02</span><h3>Establish the costs</h3><p>Develop cost advice and procurement information around the available project detail.</p></article>
                    <article><span>03</span><h3>Manage change</h3><p>Keep financial implications visible as work progresses and decisions change.</p></article>
                    <article><span>04</span><h3>Close with clarity</h3><p>Maintain a clear record through completion and agreement of the final account.</p></article>
                </div>
                <div className="approach-rule"><span>HOS CONSULT LIMITED</span><span>BUILT ENVIRONMENT · LAGOS</span></div>
            </section>
            <section className="projects-section section-pad" id="projects">
                <div className="section-wrap">
                    <div className="projects-heading">
                        <SectionIntro eyebrow="SELECTED PROJECTS" title={<>Work shaped by<br /><em>careful thinking.</em></>} copy="A selection of HOS Consult projects. Case details are placeholders until approved project information and imagery are supplied." />
                        <a className="text-link projects-link" href="#/projects">View projects <ArrowUpRight size={16} /></a>
                    </div>
                    <div className="placeholder-banner"><span className="banner-mark">!</span><p>Portfolio placeholders — add approved project names, locations, scope and images before launch.</p></div>
                    <ProjectCards />
                </div>
            </section>
            <section className="team-section section-wrap section-pad" id="team">
                <div className="team-heading">
                    <SectionIntro eyebrow="THE PEOPLE BEHIND THE WORK" title={<>Good advice starts<br />with <em>good people.</em></>} copy="Meet the professionals who bring experience, care and commercial focus to each appointment." />
                    <p className="team-note">Select a profile to read more. Approved names, biographies and portraits can be added as they are supplied.</p>
                </div>
                <TeamCards />
            </section>
            <section className="contact-section" id="contact">
                <div className="contact-grid section-wrap">
                    <div className="contact-main">
                        <p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />LET'S TALK ABOUT YOUR PROJECT</p>
                        <h2>Make the next<br /><em>decision count.</em></h2>
                        <p>Tell us what you are planning, where you are in the process and the advice you need. We’ll start with a direct conversation about your project.</p>
                        <a className="button button-light" href="#/contact">Request a consultation <ArrowUpRight size={17} /></a>
                    </div>
                    <div className="contact-card">
                        <div className="contact-card-index">HOS / 2026</div>
                        <span className="contact-card-label">CONTACT THE LAGOS OFFICE</span>
                        <a className="contact-email" href={consultationLink}>{email}<ArrowUpRight size={19} /></a>
                        <p>Lagos, Nigeria</p>
                        <div className="contact-card-line" />
                        <p className="contact-small">For project enquiries, consultation requests and professional collaborations.</p>
                    </div>
                </div>
                <div className="contact-decoration" aria-hidden="true">HOS</div>
            </section>
        </div>
    );
}

const aboutServiceStories = [
    {
        title: 'Quantity Surveying & Cost Management',
        image: '/resources/service-quantity-surveying.jpg',
        description: 'We bring cost certainty from feasibility to final account through disciplined cost planning, measurement and lifecycle control. Every recommendation is grounded in clear numbers and protects long-term value.',
        visualLabel: 'COST PLAN / LIFECYCLE CONTROL',
        visualFoot: 'CLARITY AT EVERY STAGE',
    },
    {
        title: 'Project Management',
        image: '/resources/service-project-management.jpg',
        description: 'We lead delivery from concept to completion, aligning people, scope and decisions around agreed time, cost and quality targets.',
        visualLabel: 'PROGRAMME / DELIVERY',
        visualFoot: 'ONE COORDINATED PLAN',
    },
    {
        title: 'Lender Supervision & Development Consultancy',
        image: '/resources/service-lender-supervision-development.jpg',
        description: 'We protect lending and development decisions through independent site monitoring, verified valuations and disbursements, progress reporting and compliance checks.',
        visualLabel: 'SITE REVIEW / INVESTMENT',
        visualFoot: 'INDEPENDENT OVERSIGHT',
    },
    {
        title: 'Arbitration, Claims & Expert Witness Services',
        image: '/resources/service-arbitration-claims-expert-witness.jpg',
        description: 'We assess construction claims, examine contract and cost evidence, and provide independent expert input to support balanced, timely dispute resolution.',
        visualLabel: 'EVIDENCE / RESOLUTION',
        visualFoot: 'CLEAR, INDEPENDENT ANALYSIS',
    },
    {
        title: '5D BIM Services',
        image: '/resources/service-5d-bim.jpg',
        description: 'We connect design quantities, programme data and cost information in a coordinated BIM workflow, giving teams a clearer view of changes and real-time cost exposure.',
        visualLabel: 'MODEL / COST / PROGRAMME',
        visualFoot: 'BETTER-INFORMED DELIVERY',
    },
];

function ServiceIllustration({ index }: { index: number }) {
    const service = aboutServiceStories[index];

    return (
        <div className="about-service-visual" aria-hidden="true">
            <div className="about-service-visual-topline">
                <span>HOS / TECHNICAL EXPERTISE</span>
                <span>0{index + 1} — 05</span>
            </div>
            <img className="about-service-photo" src={service.image} alt="" />
            <svg className="about-service-art" viewBox="0 0 640 430" preserveAspectRatio="xMidYMid meet">
                <rect x="42" y="35" width="556" height="352" rx="4" fill="#fbfaf7" stroke="rgba(24, 36, 78, 0.13)" />
                <path d="M72 347H568M72 98H568" stroke="rgba(24, 36, 78, 0.12)" strokeWidth="1" />
                <circle cx="524" cy="79" r="23" fill="rgba(200, 94, 50, 0.1)" />
                <circle cx="524" cy="79" r="5" fill="#c85e32" />

                {index === 0 && (
                    <g>
                        <text x="76" y="78" fill="#6f7483" fontSize="11" fontWeight="700" letterSpacing="2">COST PLAN / 01</text>
                        <rect x="76" y="116" width="252" height="178" fill="#f4f3ef" stroke="#cbd1e1" />
                        <path d="M76 151H328M76 186H328M76 221H328M76 256H328M158 116V294M238 116V294" stroke="#d6dae5" />
                        <path d="M362 276V231H400V276M414 276V197H452V276M466 276V159H504V276M518 276V128H556V276" fill="#243fb3" opacity=".85" />
                        <path d="M362 276H566" stroke="#172452" strokeWidth="2" />
                        <path d="M365 179L410 169L448 183L491 137L548 119" fill="none" stroke="#c85e32" strokeWidth="3" />
                        <circle cx="410" cy="169" r="5" fill="#c85e32" /><circle cx="491" cy="137" r="5" fill="#c85e32" />
                        <text x="77" y="321" fill="#172452" fontSize="11" fontWeight="700" letterSpacing="1.5">FEASIBILITY → FINAL ACCOUNT</text>
                    </g>
                )}

                {index === 1 && (
                    <g>
                        <text x="76" y="78" fill="#6f7483" fontSize="11" fontWeight="700" letterSpacing="2">DELIVERY PROGRAMME / 02</text>
                        <path d="M96 302V197L172 156L248 197V302M172 156V302M96 224H248M96 261H248" fill="none" stroke="#172452" strokeWidth="3" />
                        <path d="M119 302V237H146V302M180 302V221H207V302" fill="#243fb3" opacity=".85" />
                        <path d="M96 197L172 156L248 197" fill="none" stroke="#c85e32" strokeWidth="4" />
                        <rect x="310" y="126" width="238" height="190" rx="3" fill="#f4f3ef" stroke="#cbd1e1" />
                        <text x="332" y="158" fill="#172452" fontSize="12" fontWeight="700" letterSpacing="1.3">PROJECT MILESTONES</text>
                        <path d="M340 190H514M340 226H514M340 262H514" stroke="#d2d7e5" strokeWidth="7" strokeLinecap="round" />
                        <path d="M340 190H450M340 226H486M340 262H423" stroke="#243fb3" strokeWidth="7" strokeLinecap="round" />
                        <circle cx="450" cy="190" r="7" fill="#c85e32" /><circle cx="486" cy="226" r="7" fill="#c85e32" /><circle cx="423" cy="262" r="7" fill="#c85e32" />
                    </g>
                )}

                {index === 2 && (
                    <g>
                        <text x="76" y="78" fill="#6f7483" fontSize="11" fontWeight="700" letterSpacing="2">INDEPENDENT SITE REVIEW / 03</text>
                        <path d="M102 305V196L184 151L266 196V305M102 230H266M102 267H266M184 151V305" fill="none" stroke="#172452" strokeWidth="3" />
                        <path d="M102 196L184 151L266 196" fill="none" stroke="#c85e32" strokeWidth="4" />
                        <path d="M127 305V249H153V305M210 305V249H236V305" fill="#243fb3" opacity=".8" />
                        <rect x="327" y="120" width="217" height="202" rx="3" fill="#f4f3ef" stroke="#cbd1e1" />
                        <text x="350" y="153" fill="#172452" fontSize="12" fontWeight="700" letterSpacing="1.2">CERTIFIED REVIEW</text>
                        <circle cx="369" cy="194" r="11" fill="#c85e32" /><path d="M364 194L368 198L375 189" fill="none" stroke="white" strokeWidth="2" />
                        <path d="M391 194H514M358 230H514M358 266H475" stroke="#cbd1e1" strokeWidth="8" strokeLinecap="round" />
                        <path d="M391 194H488M358 230H460M358 266H424" stroke="#243fb3" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="517" cy="280" r="27" fill="none" stroke="#c85e32" strokeWidth="3" />
                        <path d="M536 300L555 319" stroke="#c85e32" strokeWidth="5" strokeLinecap="round" />
                    </g>
                )}

                {index === 3 && (
                    <g>
                        <text x="76" y="78" fill="#6f7483" fontSize="11" fontWeight="700" letterSpacing="2">CLAIMS / EVIDENCE / RESOLUTION / 04</text>
                        <path d="M111 117H310V304H111Z" fill="#f4f3ef" stroke="#cbd1e1" strokeWidth="2" />
                        <path d="M137 157H282M137 184H265M137 211H282M137 238H230" stroke="#9ea8c3" strokeWidth="7" strokeLinecap="round" />
                        <path d="M236 117V158H310" fill="#e3e6ef" stroke="#cbd1e1" strokeWidth="2" />
                        <circle cx="423" cy="190" r="45" fill="rgba(200, 94, 50, .12)" stroke="#c85e32" strokeWidth="2" />
                        <path d="M423 234V290M367 290H479M388 290L423 270L458 290" fill="none" stroke="#172452" strokeWidth="4" strokeLinecap="round" />
                        <path d="M371 186L423 159L475 186M386 186L375 223M407 186L418 223M427 186L438 223M459 186L470 223" fill="none" stroke="#172452" strokeWidth="3" />
                        <path d="M364 224Q396 248 429 224M433 224Q466 248 482 224" fill="none" stroke="#c85e32" strokeWidth="3" />
                        <path d="M355 316H500" stroke="#cbd1e1" strokeWidth="2" />
                    </g>
                )}

                {index === 4 && (
                    <g>
                        <text x="76" y="78" fill="#6f7483" fontSize="11" fontWeight="700" letterSpacing="2">COORDINATED MODEL / 05</text>
                        <path d="M120 275L242 211L358 270L236 334Z" fill="#e7eaf4" stroke="#172452" strokeWidth="2" />
                        <path d="M120 275V161L242 98V211M242 211V98L358 156V270" fill="none" stroke="#172452" strokeWidth="2" />
                        <path d="M120 161L242 222L358 156M120 199L242 260L358 194" fill="none" stroke="#243fb3" strokeWidth="2" />                        <path d="M180 130V304M297 127V302M178 131L296 189L358 156M178 168L296 226L358 194" fill="none" stroke="#c85e32" strokeWidth="2" />
                        <rect x="408" y="126" width="132" height="45" rx="2" fill="#172452" />
                        <text x="428" y="154" fill="white" fontSize="12" fontWeight="700" letterSpacing="1">5D / COST</text>
                        <path d="M408 195H540M408 228H540M408 261H540" stroke="#cbd1e1" strokeWidth="8" strokeLinecap="round" />
                        <path d="M408 195H505M408 228H478M408 261H520" stroke="#243fb3" strokeWidth="8" strokeLinecap="round" />
                        <circle cx="505" cy="195" r="6" fill="#c85e32" /><circle cx="478" cy="228" r="6" fill="#c85e32" /><circle cx="520" cy="261" r="6" fill="#c85e32" />
                    </g>
                )}
            </svg>
            <div className="about-service-visual-footer">{service.visualFoot}</div>
        </div>
    );
}

function AboutServiceReveal() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!('IntersectionObserver' in window)) return;

        const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-about-service-step]'));
        if (steps.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(entry => entry.isIntersecting)
                .sort((a, b) => {
                    const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2;
                    const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2;
                    return Math.abs(aCenter - window.innerHeight / 2) - Math.abs(bCenter - window.innerHeight / 2);
                });
            if (visible[0]) {
                setActiveIndex(Number(visible[0].target.getAttribute('data-about-service-step')));
            }
        }, { rootMargin: '-25% 0px -25% 0px', threshold: 0.45 });

        steps.forEach(step => observer.observe(step));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="about-competencies section-pad" aria-labelledby="about-competencies-title">
            <div className="section-wrap">
                <div className="about-competencies-heading">
                    <p className="eyebrow"><span className="eyebrow-dot" />OUR SERVICES</p>
                    <h2 id="about-competencies-title">Clear decisions.<br /><em>Better delivery.</em></h2>
                    <p>From the first feasibility decision to final account, we bring cost, project and dispute expertise to complex work in the built environment.</p>
                </div>
                <div className="about-competencies-layout">
                    <div className="about-competencies-list">
                        {aboutServiceStories.map((service, index) => (
                            <article
                                className={'about-competency-step' + (activeIndex === index ? ' is-active' : '')}
                                data-about-service-step={index}
                                aria-current={activeIndex === index ? 'step' : undefined}
                                key={service.title}
                            >
                                <p className="about-competency-index">0{index + 1}<span> / 05</span></p>
                                <h3>{service.title}</h3>
                                <p className="about-competency-description">{service.description}</p>
                                <div className="about-service-mobile-visual"><ServiceIllustration index={index} /></div>
                            </article>
                        ))}
                    </div>
                    <div className="about-competencies-visual-column" aria-hidden="true">
                        <div className="about-competencies-sticky">
                            {aboutServiceStories.map((service, index) => (
                                <div
                                    className={'about-competencies-panel' + (activeIndex === index ? ' is-active' : '')}
                                    key={service.title}
                                >
                                    <ServiceIllustration index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const differentiators = [
    {
        title: 'Client-Centric Approach',
        description: 'We place our clients at the heart of every project, ensuring tailored solutions and transparent communication from start to finish.',
        accent: 'var(--blue)',
    },
    {
        title: 'Unmatched Professionalism',
        description: 'Our projects are led by experienced, qualified professionals who bring deep industry insight and hands-on expertise to every assignment.',
        accent: 'var(--orange)',
    },
    {
        title: 'Proven Track Record',
        description: 'With over 25 years in the industry, we have successfully delivered complex projects across residential, commercial, and industrial sectors throughout Africa.',
        accent: 'var(--orange)',
    },
    {
        title: 'Global Alliance, Local Strength',
        description: 'As an RLB Africa Alliance Partner, we leverage a global network of knowledge, capacity, and best practices to deliver world-class solutions tailored to the local market.',
        accent: 'var(--blue)',
    },
    {
        title: 'Versatility & Reach',
        description: 'From landmark developments to bespoke private projects, our flexible approach meets the unique needs of diverse clients and project scales.',
        accent: 'var(--blue)',
    },
    {
        title: 'Integrity & Accountability',
        description: 'We uphold the highest standards of ethics and integrity, earning our clients’ trust through consistent, transparent, and reliable service.',
        accent: 'var(--orange)',
    },
];

function AboutDifferentiators() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ index: number; pointerId: number; startX: number; startY: number } | null>(null);
    const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    const constrainPosition = (index: number, x: number, y: number, card: HTMLDivElement) => {
        const container = containerRef.current;
        if (!container) return { x: 0, y: 0 };

        const containerBounds = container.getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        const position = positions[index] ?? { x: 0, y: 0 };
        const originLeft = cardBounds.left - position.x;
        const originTop = cardBounds.top - position.y;
        const minX = containerBounds.left - originLeft;
        const maxX = containerBounds.right - cardBounds.width - originLeft;
        const minY = containerBounds.top - originTop;
        const maxY = containerBounds.bottom - cardBounds.height - originTop;

        return {
            x: Math.max(minX, Math.min(maxX, x)),
            y: Math.max(minY, Math.min(maxY, y)),
        };
    };

    const startDrag = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
        if (event.button !== 0) return;
        const position = positions[index] ?? { x: 0, y: 0 };
        dragRef.current = {
            index,
            pointerId: event.pointerId,
            startX: event.clientX - position.x,
            startY: event.clientY - position.y,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDraggingIndex(index);
    };

    const moveCard = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
        const drag = dragRef.current;
        if (!drag || drag.index !== index || drag.pointerId !== event.pointerId) return;
        const next = constrainPosition(index, event.clientX - drag.startX, event.clientY - drag.startY, event.currentTarget);
        setPositions(current => ({ ...current, [index]: next }));
    };

    const finishDrag = (event: ReactPointerEvent<HTMLDivElement>, index: number) => {
        const drag = dragRef.current;
        if (!drag || drag.index !== index || drag.pointerId !== event.pointerId) return;
        dragRef.current = null;
        setDraggingIndex(null);
        setPositions(current => ({ ...current, [index]: { x: 0, y: 0 } }));
    };

    const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, index: number) => {
        const position = positions[index] ?? { x: 0, y: 0 };
        if (event.key === 'Escape') {
            event.preventDefault();
            setPositions(current => ({ ...current, [index]: { x: 0, y: 0 } }));
            return;
        }
        const nudge = 24;
        const offsets: Record<string, { x: number; y: number }> = {
            ArrowLeft: { x: -nudge, y: 0 },
            ArrowRight: { x: nudge, y: 0 },
            ArrowUp: { x: 0, y: -nudge },
            ArrowDown: { x: 0, y: nudge },
        };
        const offset = offsets[event.key];
        if (!offset) return;
        event.preventDefault();
        const next = constrainPosition(index, position.x + offset.x, position.y + offset.y, event.currentTarget);
        setPositions(current => ({ ...current, [index]: next }));
    };

    return (
        <section className="about-differentiators section-pad" aria-labelledby="about-differentiators-title">
            <div className="section-wrap">
                <div className="about-differentiators-heading">
                    <p className="eyebrow"><span className="eyebrow-dot" />WHY HOS CONSULT</p>
                    <h2 id="about-differentiators-title">What makes us <em>different.</em></h2>
                </div>
                <div className="about-differentiators-grid" ref={containerRef}>
                    {differentiators.map((item, index) => {
                        const position = positions[index] ?? { x: 0, y: 0 };                        return (
                            <article
                                className={'about-differentiator-card' + (draggingIndex === index ? ' is-dragging' : '')}
                                style={{ borderColor: item.accent, transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
                                role="group"
                                aria-roledescription="draggable card"
                                aria-label={`${item.title}. Use arrow keys to move; Escape returns the card.`}
                                tabIndex={0}
                                onPointerDown={event => startDrag(event, index)}
                                onPointerMove={event => moveCard(event, index)}
                                onPointerUp={event => finishDrag(event, index)}
                                onPointerCancel={event => finishDrag(event, index)}
                                onLostPointerCapture={event => finishDrag(event, index)}
                                onKeyDown={event => handleCardKeyDown(event, index)}
                                key={item.title}
                            >
                                <h3 style={{ color: item.accent }}>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function AboutPage() {
    return (
        <div className="page-view">
            <section className="subpage-hero about-hero">
                <div className="section-wrap about-hero-content">
                    <p className="eyebrow"><span className="eyebrow-dot" />ABOUT HOS CONSULT</p>
                    <h1>Cost expertise,<br /><em>applied with purpose.</em></h1>
                    <p className="about-hero-copy">HOS Consult Limited is a Lagos-based firm of chartered quantity surveyors and project managers, established in 1996 to support clients in the built environment.</p>
                    <div className="about-hero-actions">
                        <a className="button button-primary" href="/resources/hos-profile.pdf" download="HOS PROFILE.pdf">
                            Download Our Profile <ArrowDown size={15} />
                        </a>
                        <a className="button about-hero-secondary" href="#/projects">
                            See Our Projects <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>
            <section className="about-detail section-wrap section-pad">
                <div className="about-detail-kicker"><span>01</span><span>OUR PRACTICE</span></div>
                <div><h2>Sound advice for <em>better-built value.</em></h2><p>We bring cost knowledge, project coordination and development advice to the decisions that shape a construction project. From early feasibility through procurement and delivery, we help clients see the financial implications, assess options and keep the project brief in view.</p><p>Our approach combines professional expertise with an understanding of design objectives, construction costs and the value clients need from their investment.</p><div className="about-facts"><div><small>ESTABLISHED</small><strong>1996</strong></div><div><small>OFFICE</small><strong>Lagos, Nigeria</strong></div><div><small>PROFESSIONAL STATUS</small><strong>RICS-regulated firm</strong></div></div></div>
            </section>
            <AboutServiceReveal />
            <section className="about-impact" aria-label="Project delivery track record">
                <div className="section-wrap about-impact-inner">
                    <div className="about-impact-copy">
                        <p className="about-impact-kicker">HOS CONSULT / PROJECT EXPERIENCE</p>
                        <h2>Trusted to deliver at scale.</h2>
                        <p>Across residential sectors, we have successfully delivered more than 500 projects and managed over $2 billion in project value.</p>
                    </div>
                    <div className="about-impact-stats">
                        <div><strong>500+</strong><span>projects delivered</span></div>
                        <div><strong>$2B+</strong><span>project value managed</span></div>
                    </div>
                </div>
            </section>
            <AboutDifferentiators />
            <section className="team-section section-pad">
                <div className="section-wrap">
                    <div className="team-heading"><SectionIntro eyebrow="THE PEOPLE BEHIND THE WORK" title={<>Good advice starts<br />with <em>good people.</em></>} copy="Meet the professionals who bring experience, care and commercial focus to each appointment." /><p className="team-note">Select a profile to read more. Approved names, biographies and portraits can be added as they are supplied.</p></div>
                    <TeamCards />
                </div>
            </section>
        </div>
    );
}

function ServicesPage() {
    return (
        <div className="page-view">
            <section className="subpage-hero section-wrap">
                <p className="eyebrow"><span className="eyebrow-dot" />OUR SERVICES</p>
                <h1>What do you want<br />to <em>build?</em></h1>
                <p>Choose the support your project needs. Our services bring cost expertise and practical project advice to the built environment.</p>
            </section>
            <section className="services-section services-page-section section-pad">
                <div className="section-wrap">
                    <div className="service-intro-note"><span>01—07</span><p>Services are shown in the order requested, with Quantity Surveying & Cost Management first. Scope descriptions can be refined from the company brochure.</p></div>
                    <ServiceCards />
                    <div className="service-footnote"><span className="footnote-symbol">+</span><p>Every appointment is shaped around the project brief, client priorities and agreed scope of service.</p></div>
                </div>
            </section>
        </div>
    );
}

function ProjectsPage() {
    return (
        <div className="page-view">
            <section className="subpage-hero projects-subhero section-wrap">
                <p className="eyebrow"><span className="eyebrow-dot" />PROJECTS</p>
                <h1>Work shaped by<br /><em>careful thinking.</em></h1>
                <p>Selected project stories will show the brief, HOS Consult’s role and the expertise brought to each appointment.</p>
            </section>
            <section className="projects-section projects-page-section section-pad">
                <div className="section-wrap">
                    <div className="placeholder-banner"><span className="banner-mark">!</span><p>Portfolio placeholders — replace with approved project names, locations, scope and images before launch.</p></div>
                    <ProjectCards />
                </div>
            </section>
        </div>
    );
}

function ContactPage() {
    return (
        <div className="page-view">
            <section className="subpage-hero section-wrap">
                <p className="eyebrow"><span className="eyebrow-dot" />CONTACT HOS CONSULT</p>
                <h1>Let’s talk about<br /><em>your project.</em></h1>
                <p>Tell us what you are planning, where you are in the process and the advice you need. Start with a direct conversation with HOS Consult.</p>
            </section>
            <section className="contact-section contact-page-section">
                <div className="contact-grid section-wrap">
                    <div className="contact-main"><p className="eyebrow eyebrow-light"><span className="eyebrow-dot" />REQUEST A CONSULTATION</p><h2>Make the next<br /><em>decision count.</em></h2><p>Share a few details about your project and the support you are looking for. We’ll start with a conversation about your needs.</p><a className="button button-light" href={consultationLink}>Email HOS Consult <ArrowUpRight size={17} /></a></div>
                    <div className="contact-card"><div className="contact-card-index">HOS / LAGOS</div><span className="contact-card-label">CONTACT THE LAGOS OFFICE</span><a className="contact-email" href={consultationLink}>{email}<ArrowUpRight size={19} /></a><p>Lagos, Nigeria</p><div className="contact-card-line" /><p className="contact-small">For project enquiries, consultation requests and professional collaborations.</p></div>
                </div>
                <div className="contact-decoration" aria-hidden="true">HOS</div>
            </section>
        </div>
    );
}

function PageContent({ route }: { route: RouteName }) {
    if (route === 'about') return <AboutPage />;
    if (route === 'services') return <ServicesPage />;
    if (route === 'projects') return <ProjectsPage />;
    if (route === 'contact') return <ContactPage />;
    return <HomePage />;
}

function App() {
    const [route, setRoute] = useState<RouteName>(() => readRoute());
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(() => window.scrollY > 12);

    useEffect(() => {
        const updateScrolled = () => setScrolled(window.scrollY > 12);
        updateScrolled();
        window.addEventListener('scroll', updateScrolled, { passive: true });
        return () => window.removeEventListener('scroll', updateScrolled);
    }, []);

    useEffect(() => {
        const onHashChange = () => {
            setRoute(readRoute());
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.addEventListener('hashchange', onHashChange);
        if (!window.location.hash) window.location.hash = '#/home';
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    useEffect(() => {
        const title = pages.find(page => page.route === route)?.label ?? 'Home';
        document.title = title === 'Home' ? 'HOS Consult Limited | Quantity Surveying & Project Management' : title + ' | HOS Consult Limited';
    }, [route]);

    return (
        <div className="site-shell">
            <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
                <div className="header-inner">
                    <BrandMark />
                    <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <nav className={'main-nav' + (menuOpen ? ' is-open' : '')} aria-label="Main navigation">
                        {pages.slice(0, 4).map(page => (
                            <a className={route === page.route ? 'active' : ''} href={page.href} key={page.route} aria-current={route === page.route ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{page.label}</a>
                        ))}
                        <a href="https://www.rlb.com/africa/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>International Affiliation</a>
                        <a className={'nav-cta' + (route === 'contact' ? ' active' : '')} href="#/contact" aria-current={route === 'contact' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Contact Us <ArrowUpRight size={15} /></a>
                    </nav>
                </div>
            </header>
            <main><PageContent route={route} /></main>
            <footer className="site-footer">
                <div className="footer-main section-wrap">
                    <BrandMark />
                    <p>Quantity Surveyors<br />Project Managers<br />Development Consultants</p>
                    <a className="footer-top" href="#/home">Back to top <ArrowUpRight size={15} /></a>
                </div>
                <div className="footer-bottom section-wrap">
                    <span>© 2026 HOS Consult Limited</span>
                    <span>Built on clarity. Focused on value.</span>
                    <a href={consultationLink}>hosconsult@gmail.com</a>
                </div>
            </footer>
        </div>
    );
}
export default App;

