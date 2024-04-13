import { OutlookDataProps } from "../components/types";

export const outlookData: OutlookDataProps = {
    'inbox': [
        {
            id: 1,
            type: 'single',
            subject: 'Inbox Email 1: Welcome',
            description: 'These components use the Material UI SvgIcon component to render the SVG path for each icon, and so have a peer-dependency on @mui/material.',
            from: 'yogesh@singh.com',
            senderName: 'Yogesh Singh',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'], 
            replys: []
        },
        {
            id: 2,
            type: 'group',
            subject: 'Inbox Email 2: A new Amazon ElastiCache service update is available.',
            description: 'SVG elements should be scaled for a 24x24px viewport so that the resulting icon can be used as is, or included as a child for other Material UI components that use icons. This can be customized with the viewBox attribute.',
            from: 'rajni@gupta.com',
            senderName: 'Rajni Gupta',
            to: ['rajni@gupta.com', 'hitarth@reja.com', 'papu@kapoor.com', 'ankur@kabadi.com'],
            expanded: false,
            replys: [
                {
                    id: 3,
                    type: 'reply',
                    description: 'By default, the component inherits the current color. Optionally, you can apply one of the theme colors using the color prop.',
                    subject: 'Inbox Email 2: A new Amazon ElastiCache service update is available.',
                    from: 'rajni@gupta.com',
                    senderName: 'Rajni Gupta',
                    to: ['hitarth@gupta.com', 'hitarth@reja.com', 'papu@kapoor.com'],
                    replys: []
                },
                {
                    id: 4,
                    type: 'reply',
                    description: `Google was founded on September 4, 1998, by American computer scientists Larry Page and Sergey Brin while they were PhD students at Stanford University in California. Together, they own about 14% of its publicly listed shares and control 56% of its stockholder voting power through super-voting stock. The company went public via an initial public offering (IPO) in 2004. In 2015, Google was reorganized as a wholly owned subsidiary of Alphabet Inc. Google is Alphabets largest subsidiary and is a holding company for Alphabet's internet properties and interests. Sundar Pichai was appointed CEO of Google on October 24, 2015, replacing Larry Page, who became the CEO of Alphabet. On December 3, 2019, Pichai also became the CEO of Alphabet.`,
                    subject: 'Inbox Email 2: A new Amazon ElastiCache service update is available.',
                    from: 'papu@kapoor.com',
                    senderName: 'Papu Nath Kapoor',
                    to: ['hitarth@gupta.com', 'hitarth@reja.com', 'rajni@gupta.com'],
                    replys: []
                },
                {
                    id: 5,
                    type: 'single',
                    description: 'If you find that there are layout issues when using FontAwesomeIcon from @fortawesome/react-fontawesome, you can try passing the Font Awesome SVG data directly to SvgIcon.',
                    subject: 'Inbox Email 2: A new Amazon ElastiCache service update is available.',
                    from: 'hitarth@gupta.com',
                    to: ['papu@kapoor.com', 'hitarth@reja.com', 'rajni@gupta.com'],
                    replys: []
                }
            ]    
        },
        {
            id: 6,
            type: 'single',
            subject: 'Inbox Email 3',
            description: 'Stay tuned for ongoing COVID-19, Work from Home guidance and Return to Workplace related updates. Hello, In this example the remote module only works when the page is refreshed. Even if the loaded script is deleted, it is impossible to install and remove the code. how can i remove script code from browser. because I checked the console and saw that it is still installed. how can i make dynamic loading module.',
            from: 'animesh@jaiswal.com',
            senderName: 'Animesh Jaiswal',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        },
    ],
    'drafts': [
        {
            id: 7,
            type: 'single',
            subject: 'Draft Email 1',
            description: 'These components use the Material UI SvgIcon component to render the SVG path for each icon, and so have a peer-dependency on @mui/material.',
            from: 'ankit@gupta.com',
            senderName: 'Ankit Gupta',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        },
        {
            id: 8,
            type: 'single',
            subject: 'Draft Email 2',
            description: 'Stay tuned for ongoing COVID-19, Work from Home guidance and Return to Workplace related updates. Hello, In this example the remote module only works when the page is refreshed. Even if the loaded script is deleted, it is impossible to install and remove the code. how can i remove script code from browser. because I checked the console and saw that it is still installed. how can i make dynamic loading module.',
            from: 'ankit@gupta.com',
            senderName: 'Ankit Gupta',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        }
    ],
    'sent-items': [
        {
            id: 9,
            type: 'single',
            subject: 'Sent Email 1',
            description: 'These components use the Material UI SvgIcon component to render the SVG path for each icon, and so have a peer-dependency on @mui/material.',
            from: 'ankit@gupta.com',
            senderName: 'Ankit Gupta',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        },
        {
            id: 10,
            type: 'single',
            subject: 'Sent Email 2',
            description: 'Stay tuned for ongoing COVID-19, Work from Home guidance and Return to Workplace related updates. Hello, In this example the remote module only works when the page is refreshed. Even if the loaded script is deleted, it is impossible to install and remove the code. how can i remove script code from browser. because I checked the console and saw that it is still installed. how can i make dynamic loading module.',
            from: 'ankit@gupta.com',
            senderName: 'Ankit Gupta',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        }
    ],
    'deleted-items': [
        {
            id: 11,
            type: 'single',
            subject: 'Deleted Email 1',
            description: 'These components use the Material UI SvgIcon component to render the SVG path for each icon, and so have a peer-dependency on @mui/material.',
            from: 'saurabh@chench.com',
            senderName: 'Saurabh Chenchde',
            to: ['ankit@gupta.com', 'ranga@parbat.com', 'kishkinda@naresh.com'],
            replys: []    
        },
        {
            id: 12,
            type: 'single',
            subject: 'Deleted Email 2',
            description: 'Stay tuned for ongoing COVID-19, Work from Home guidance and Return to Workplace related updates. Hello, In this example the remote module only works when the page is refreshed. Even if the loaded script is deleted, it is impossible to install and remove the code. how can i remove script code from browser. because I checked the console and saw that it is still installed. how can i make dynamic loading module.',
            from: 'ranga@parbat.com',
            senderName: 'Ranga Parbat',
            to: ['saurabh@chench.com', 'ankit@gupta.com', 'kishkinda@naresh.com'],
            replys: []    
        },
        {
            id: 13,
            type: 'single',
            subject: 'Deleted Email 3',
            description: `Google was initially funded by an August 1998 investment of $100,000 from Andy Bechtolsheim,[21] co-founder of Sun Microsystems. This initial investment served as a motivation to incorporate the company to be able to use the funds.[40][41] Page and Brin initially approached David Cheriton for advice because he had a nearby office in Stanford, and they knew he had startup experience, having recently sold the company he co-founded, Granite Systems, to Cisco for $220 million. David arranged a meeting with Page and Brin and his Granite co-founder Andy Bechtolsheim. The meeting was set for 8 a.m. at the front porch of David's home in Palo Alto and it had to be brief because Andy had another meeting at Cisco, where he now worked after the acquisition, at 9 a.m. Andy briefly tested a demo of the website, liked what he saw, and then went back to his car to grab the check. David Cheriton later also joined in with a $250,000 investment.`,
            from: 'kishkinda@naresh.com',
            to: ['saurabh@chench.com', 'ranga@parbat.com', 'ankit@gupta.com'],
            replys: []    
        }
    ],
 };

 export const colorMap = {
    'inbox': ['#2E39A1', '#BB4747', '#7A5A3A', '#F77419', '#B91D04'],
    'drafts': ['#7A5A3A', '#2E39A1', '#F77419', '#BB4747', '#B91D04'],
    'sent-items': ['#2E39A1', '#F77419', '#7A5A3A', '#BB4747', '#B91D04'],
    'deleted-items': ['#F77419', '#7A5A3A', '#BB4747', '#2E39A1', '#B91D04']
 }

 export const emailList = [
    'yogesh@singh.com', 
    'rajni@gupta.com', 
    'papu@kapoor.com', 
    'hitarth@gupta.com', 
    'animesh@jaiswal.com', 
    'saurabh@chench.com', 
    'ranga@parbat.com', 
    'kishkinda@naresh.com'
];
