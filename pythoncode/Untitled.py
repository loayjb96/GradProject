
# coding: utf-8

# In[4]:


import os
import pydub
import glob

def mp3_to_wav():
    mp3=glob.glob('./*.mp3')
    for mp3_file in mp3:
        wav=os.path.splitext(mp3_file)[0]+'.wav'
        sound=pydub.AudioSegment.from_mp3(mp3_file)
        sound.export(wav,format="wav") 
        
mp3_to_wav()
    

  


# In[2]:


import librosa    
import os
import pydub
import glob
def downsample():
    mp3=glob.glob('./*.wav')
    for mp3_file in mp3:
        y, sr = librosa.load(mp3_file, sr=8000) # Downsample to 8kHz
        librosa.output.write_wav(mp3_file, y, sr)
downsample()        

