

import os
from dj_static import Cling
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

application = Cling(get_wsgi_application())
# application=get_wsagi_application()
