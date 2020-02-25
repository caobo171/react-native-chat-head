package com.floatingbubble;

public class ChatHeadModel{

    final public  String id ;
    final public String photoUrl;
    public String content;
    public Integer notiNumber ;
    public String data;


    public ChatHeadModel (
                String id , String photoUrl, String content, Integer notiNumber , String data
        ){
            this.id = id;
            this.photoUrl = photoUrl;
            this.content = content;
            this.notiNumber = notiNumber;
            this.data = data;
        }
}
