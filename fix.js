const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.tsx', 'utf8');
text = text.replace('        </div>\n      </section>', '        </div>\n        </div>\n      </section>');
fs.writeFileSync('src/pages/Home.tsx', text);
