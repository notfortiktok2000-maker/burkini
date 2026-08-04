import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# Add a missing closing div
content = re.sub(r'        </div>\n      </section>\n    </div>\n  \);\n}', '        </div>\n        </div>\n      </section>\n    </div>\n  );\n}', content)

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)
