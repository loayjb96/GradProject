from django.shortcuts import render
from rest_framework import viewsets

from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_400_BAD_REQUEST
from  myvenv.Lib import pydub
from rest_framework.decorators import api_view, permission_classes, authentication_classes
import os 
# from .decorators import define_usage

# def check_file(viewsets.ModelViewSet):


#     @action(detail=True,method=['Post'])
#     def convert_file(self,request,pk=none)


@api_view(['POST'])
# @api_view(['GET'])

@permission_classes((AllowAny,))
# import pydub
#URL /
# @define_usage(returns={'url_usage': 'Dict'})
# @api_view(['GET'])
# @permission_classes((AllowAny,)

def api_convert(request):
    def f(method):
        return "<h1>MyClub Event Calendar"+method+"</h1>"

    method=''
    if request.method == 'GET':
        method='get'
        print(' get method')
    if request.method == 'POST':
        method='post'
        print('post method')

    #  return HttpResponse("<h1>MyClub Event Calendar</h1>")
    try:
        # body_unicode = request.body.decode('utf-8')
        # body = json.loads(body_unicode)
        # content = body['content']
        post_quary=request.POST
        # print(request.data)
        print(post_quary)

        # files=request.META
        file=request.FILES['myfile']
        # os.system(file.mp3)


        # with open('/path/I/want/to/save/file/to/file_name.pdf', 'wb') as f:
        # f.write(r.content)
        # os.startfile(files)
        # os.startfile(files)

    except:
        return HttpResponse({'error tt   '+method: 'Please provide correct file'},
                         status=HTTP_400_BAD_REQUEST)
    # return HttpResponse("<h1>MyClub Event Calendar"+method+"</h1>")
    # file = open("/path/to/your/song.mp3", "rb").read() 

    try:    
        # with open(file_location, 'r') as f:
        file_data = file.read()

        # sending response 
        response = HttpResponse(file_data, content_type='audio/mpeg')
        response['Content-Disposition'] = 'attachment; filename="foo.xls"'

    except IOError:
        # handle file not exist case here
        response = HttpResponse('<h1>File not exist</h1>')

    return response
        # wav=os.path.splitext(mp3_file)[0]+'.wav'
    # wav='mmm'+'.wav'
    # sound=pydub.AudioSegment.from_mp3(myfile)
    # sound.export(wav,format="wav") 
    
    

# Create your views here.
