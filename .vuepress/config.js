module.exports = {
  "title": "Kloudbank",
  "description": "Kloudbank demo.",
  "dest": "public",
  "base": "/",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "lang": 'ko-KR',
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitOps-Task Runner",
            "link": "/docs/001_hcpsrecq/"
          },
          // {
          //   "text": "BP Collab.",
          //   "link": "/docs/002_bpcollab/"
          // }
        ]
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/kloudbank",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      // Blogs
      "/blogs/001_guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: ["", "env", "doc"],
          sidebarDepth: 2,
        },
        {
          title: "Resource",
          collapsable: false,
          children: ["resource"],
        },
      ],
      "/blogs/002_cloud/": [
        {
          title: "Introduction",
          collapsable: false,
          children: [""],
        },
        {
          title: "AWS",
          collapsable: false,
          children: ["start","certi"],
        },
        {
          title: "Resources",
          collapsable: false,
          children: ["eks", "alb", "nlb", "ebs", "efs"],
        },
      ],
      "/blogs/003_refarch/": [
        {
          title: "Introduction",
          collapsable: false,
          children: [""],
          sidebarDepth: 2,
        },
        {
          title: "Modern API",
          collapsable: false,
          children: ["modernapi"],
          sidebarDepth: 2,
        },
        {
          title: "Redis",
          collapsable: false,
          children: ["perftest", "hatest"],
          sidebarDepth: 2,
        },
        {
          title: "EIP",
          collapsable: false,
          children: ["camel", "legacy"],
          sidebarDepth: 2,
        },
        {
          title: "Research ('20)",
          collapsable: false,
          children: ["keycloak", "harbor"],
          sidebarDepth: 2,
        },
      ],
      "/blogs/004_cna/": [
        {
          title: "Cloud Native App",
          collapsable: false,
          children: ["", "container", "k8s", "restapi"],
          sidebarDepth: 1,
        },
        {
          title: "Springboot",
          collapsable: false,
          children: [
            "springboot/",
            "springboot/restapi",
            "springboot/bean",
            "springboot/env",
            "springboot/mybatis",
            "springboot/rest-client",
          ],
          sidebarDepth: 1,
        },
      ],
      "/blogs/005_ml/": [
        {
          title: "Introduction",
          collapsable: false,
          children: [""],
          sidebarDepth: 2,
        },
        {
          title: "Jupyter",
          collapsable: false,
          children: [
            "jupyterintro",
            "jupyterserver",
            "jupyterhub",
            "jupyterproxy",
          ],
          sidebarDepth: 2,
        },
        {
          title: "Inference",
          collapsable: false,
          children: ["inferenceintro", "inferencetriton", "inferencekfserving"],
          sidebarDepth: 2,
        },
      ],
      "/blogs/006_gitops/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "gitopsintro", "helm_kustomize"],
          sidebarDepth: 2,
        },
        {
          title: "FluxCD",
          collapsable: false,
          children: ["fluxintro", "fluxcdv2"],
          sidebarDepth: 2,
        },
        {
          title: "Flagger",
          collapsable: false,
          children: ["flaggerintro", "flaggerdeploy"],
          sidebarDepth: 2,
        },
        {
          title: "ArgoCD",
          collapsable: false,
          children: ["argocdintro","argocddeploy"],
          sidebarDepth: 2,
        },
      ],
      "/blogs/007_multicloud/": [
        {
          title: "Introduction",
          collapsable: false,
          children: ["", "diagram"],
          sidebarDepth: 2,
        },
      ],
      // Docs
      "/docs/001_hcpsrecq/": [
        {
          title: "Introduction",
          collapsable: false,
          children: [""],
        },
        {
          title: "Basics",
          collapsable: false,
          children: ["setup", "platformapi", "standard"],
          sidebarDepth: 2,
        },
        {
          title: "Design",
          collapsable: false,
          children: ["basics", "resources"],
          sidebarDepth: 2,
        },
      ],
      // "/docs/002_bpcollab/": [
      //   {
      //     title: "Introduction",
      //     collapsable: false,
      //     children: [""],
      //   },
      // ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/logo.png",
    "style": "@vuepress-reco/style-default",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "noisonnoiton",
    "authorAvatar": "/avatar.png",
    "record": "kloudbank",
    "startYear": "2021",
    "noFoundPageByTencent": false,
    "subSidebar": true
  },

  "markdown": {
    "lineNumbers": true,
    extendMarkdown: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-plantuml'))
    }
  },

  "plugins": [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    "@dovyp/vuepress-plugin-clipboard-copy",
  ]
}
