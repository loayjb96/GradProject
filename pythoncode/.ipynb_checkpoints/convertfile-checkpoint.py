
# coding: utf-8

# In[1]:


#315606483 musa hassuna 
import numpy as np
import cv2
from matplotlib import pyplot as plt
import glob
MIN_MATCH_COUNT = 10
path1 = glob.glob("myq3imges/*.png")
path2 = glob.glob("Q2DB/*.png")
 
def Read_img(path_to_directory,db,read):
    for img in path_to_directory:
        n = cv2.imread(img)
        if(read==1):
            n=cv2.fastNlMeansDenoisingColored(n,None,10,10,7,21)
            
        
        db.append(n) 
Image_DB=[]
cv_img=[]
Read_img(path2,Image_DB,0)
Read_img(path1,cv_img,1)

# print(" ;;;",len(cv_img))
# img1 = cv_img[2]  
# queryImage
# img2 = cv2.imread('Q2DB/00433.png',0) # trainImage
# img2 = cv2.imread('can_background.jpg',0) # trainImage
# plt.imshow(img2,0)
# Initiate SIFT detector
def check_simlarty(img1,img2,index):
    sift = cv2.xfeatures2d.SIFT_create()

# find the keypoints and descriptors with SIFT
    kp1, des1 = sift.detectAndCompute(img1,None)
    kp2, des2 = sift.detectAndCompute(img2,None)

    FLANN_INDEX_KDTREE = 0
    index_params = dict(algorithm = FLANN_INDEX_KDTREE, trees = 5)
    search_params = dict(checks = 50)

    flann = cv2.FlannBasedMatcher(index_params, search_params)

    matches = flann.knnMatch(des1,des2,k=2)

# store all the good matches as per Lowe's ratio test.
    good = []
    for m,n in matches:
        if m.distance < 0.8*n.distance:
            good.append(m)

    return len(good)

# draw_params = dict(matchColor = (0,255,0), # draw matches in green color
#                    singlePointColor = None,
#                    matchesMask = matchesMask, # draw only inliers
#                    flags = 2)

# img3 = cv2.drawMatches(img1,kp1,img2,kp2,good,None,**draw_params)

# plt.imshow(img3, 'gray'),plt.show()

img1 = cv_img[1]  
# queryImage
# img2 = cv2.imread('Q2DB/00433.png',0) # trainImage

def get_imge(img1,Image_DB):
    matches_of_first_img=[]

    i = 0
    for im in Image_DB:
#         plt.imshow(im)
        len_match=check_simlarty(img1,im,i) 
        i+=1
#     print('++++++',len_match)
        matches_of_first_img.append(len_match)
    index=matches_of_first_img.index(max(matches_of_first_img))
#     print(matches_of_first_img[index])
    return index
def s_t_img(img1,img2): 
    
    f = plt.figure()
    f.add_subplot(1,2, 1)
    plt.imshow(img1)
    f.add_subplot(1,2, 2)
    plt.imshow(img2)
    plt.show(block=True) 
#     plt.savefig('mosa aaa')
# index=get_imge(img1,Image_DB)


# In[2]:



    
print(' first imge  ')
img1 = cv_img[0]  
index_img1=get_imge(img1,Image_DB)

s_t_img(img1,Image_DB[index_img1])
# print((matches_of_first_img[430]))
# print('__________________-',max(matches_of_first_img)) 
# print('_____________________',matches_of_first_img.index(max(matches_of_first_img)))


# In[3]:


print(' secound  image  ')

img2 = cv_img[1]  
index_img2=get_imge(img2,Image_DB)

s_t_img(img2,Image_DB[index_img2])
# print('ccc'index)


# In[4]:


print(' third imge  ')

img3 = cv_img[2]  
index_img3=get_imge(img3,Image_DB)

s_t_img(img3,Image_DB[index_img3])


# In[5]:


# img0 = cv_img[0]  
# index_img0=get_imge(img3,Image_DB)
# s_t_img(img3,Image_DB[index_img0])

