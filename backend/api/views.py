from django.shortcuts import render
from rest_framework import viewsets

from django.http import HttpResponse
# def check_file(viewsets.ModelViewSet):


#     @action(detail=True,method=['Post'])
#     def convert_file(self,request,pk=none)


# @api_view(['POST'])
# @permission_classes((AllowAny,))
def api_convert(request):
     return HttpResponse("<h1>MyClub Event Calendar</h1>")
    # try:
    #     myfile=request.data['myfile']
    # except:
    #     return HttpResponse({'error': 'Please provide correct file'},
    #                      status=HTTP_400_BAD_REQUEST)

    # import pydub
    # for mp3_file in myfile:
    #     # wav=os.path.splitext(mp3_file)[0]+'.wav'
    #     sound=pydub.AudioSegment.from_mp3(mp3_file)
    #     sound.export(wav,format="wav") 
    

# Create your views here.
