import MarkdownPreview from '@uiw/react-markdown-preview';

const INFO = `
# Project File Upload System

The Competition File Upload System is a custom-designed platform for the Department of Computer Science and Artificial Intelligence at National Pingtung University. This system is specifically developed to simplify and streamline the process of uploading files for various academic and programming competitions.

## Backend Dependencies

- [archiver](https://github.com/archiverjs/node-archiver) (MIT)
- [compression](https://github.com/expressjs/compression) (MIT)
- [connect-redis](https://github.com/tj/connect-redis) (MIT)
- [cors](https://github.com/expressjs/cors) (MIT)
- [dotenv](https://github.com/motdotla/dotenv) (BSD-2-Clause)
- [express](https://github.com/expressjs/express) (MIT)
- [express-session](https://github.com/expressjs/session) (MIT)
- [file-type](https://github.com/sindresorhus/file-type) (MIT)
- [helmet](https://github.com/helmetjs/helmet) (MIT)
- [hpp](https://github.com/analog-nico/hpp) (ISC)
- [morgon](https://github.com/expressjs/morgan) (MIT)
- [multer](https://github.com/expressjs/multer) (MIT)
- [mysql2](https://github.com/sidorares/node-mysql2) (MIT)
- [passport](https://github.com/jaredhanson/passport) (MIT)
- [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2) (MIT)
- [redis](https://github.com/redis/node-redis) (MIT)
- [sequelize](https://github.com/sequelize/sequelize) (MIT)
- [winston](https://github.com/winstonjs/winston) (MIT)
- [wonston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) (MIT)
- [zod](https://github.com/colinhacks/zod) (MIT)

## Frontend Dependencies
- [@tanstack/react-query](https://github.com/TanStack/query) (MIT)
- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview) (MIT)
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) (MIT)
- [clsx](https://github.com/lukeed/clsx) (MIT)
- [daisyui](https://github.com/saadeghi/daisyui) (MIT)
- [framer-motion](https://github.com/motiondivision/motion) (MIT)
- [ky](https://github.com/sindresorhus/ky) (MIT)
- [react](https://github.com/facebook/react) (MIT)
- [react-icons](https://github.com/react-icons/react-icons) ([LICENSE](https://raw.githubusercontent.com/react-icons/react-icons/refs/heads/master/LICENSE))
- [react-router-dom](https://github.com/remix-run/react-router) (MIT)
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss) (MIT)
- [zustand](https://github.com/pmndrs/zustand) (MIT)
 
## Icon Set

- [Bootstrap Icons](https://github.com/twbs/icons) (MIT)
- [BoxIcons](https://github.com/atisawd/boxicons) (MIT)
- [Ionicons 5](https://github.com/ionic-team/ionicons) (MIT)
- [Material Design icons](http://google.github.io/material-design-icons/) (Apache License Version 2.0)
- [Phosphor Icons](https://github.com/phosphor-icons/core) (MIT)
- [Remix Icon](https://github.com/Remix-Design/RemixIcon) (Apache License Version 2.0)
- [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT)

## License
\`\`\`
ISC License

Copyright (c) 2024, Mirumodapon

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
\`\`\`
`;

function SystemInfo() {
  return (
    <div className="py-5 px-10 w-full overflow-auto" data-color-mode="light">
      <MarkdownPreview source={INFO} />
    </div>
  );
}

export default SystemInfo;
