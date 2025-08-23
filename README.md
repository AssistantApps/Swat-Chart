<div align="center">
  
# Swat Chart

  _A simple chart to be used in your projects._
  
  <br />  
  
  ![header](https://github.com/AssistantApps/.github/blob/main/img/animatedBanner.svg?raw=true)
  
  <br />
  
  ![madeWithLove](https://github.com/AssistantApps/.github/blob/main/badges/made-with-love.svg)
  ![gitmoji](https://github.com/AssistantApps/.github/blob/main/badges/gitmoji.svg?raw=true)<br />
  ![Profile views](https://komarev.com/ghpvc/?username=AssistantApps&color=green&style=for-the-badge)

  [![Follow on Twitter](https://img.shields.io/twitter/follow/AssistantApps?color=%231d9bf0&style=for-the-badge)][assistantAppsTwitter]
  [![Discord](https://img.shields.io/discord/625007826913198080?style=for-the-badge)][discord]
  
  <br />
</div>

## Links

[npm package](https://www.npmjs.com/package/@assistantapps/swat-chart)
[demo](https://assistantapps.github.io/Swat-Chart)

## Install

```bash
npm install @assistantapps/swat-chart
```

## Usage

```ts
import { generateSwatChart } from '@assistantapps/swat-chart';

const svgContent = generateSwatChart({
  chart: {
    width: 800,
    height: 400,
    borderRadius: 20,
    lineWidth: 3,
    padding: { x: 20, y: 20 },
  },
  colour: {
    backgroundFill: '#DFFFDF',
    // ...
  },
  // etc ...
});
```

<details>
  <summary>React</summary>

  ```jsx
  <div dangerouslySetInnerHTML={{ __html: svgContent }} />
  ```

</details>

<details>
  <summary>SolidJS</summary>

  ```jsx
  <div class="display" innerHTML={svgContent} />
  ```

</details>

<details>
  <summary>Angular</summary>

  ```ts
  // component.ts
  import { Component } from '@angular/core';
  import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

  @Component({
    selector: 'app-root',
    template: `<div [innerHTML]="safeSvg"></div>`
  })
  export class AppComponent {
    svgContent: string = generateSwatChart({ /* config */ });
    safeSvg: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {
      this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(this.svgContent);
    }
  }
  ```

</details>

[assistantAppsTwitter]: https://twitter.com/AssistantApps?ref=AssistantAppsGithub
[discord]: https://assistantapps.com/discord?ref=AssistantAppsGithub
