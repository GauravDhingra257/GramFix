
# GramFix

In age of social media, people are using the incorrect form of grammar and even 
incorrect English in their messages, so when they have to write a formal letter, mail, message 
to someone they face issues. People often use some software like Grammarly to ensure that the 
message they send is absolutely correct. 
Our project also has the same motive and we have tried to make an alternative to Grammarly, 
without the hassle of logging in to a website and having a possible risk of data leak.

## Machine Learning Model:

T5-base model:
The Text-to-Text Transfer Transformer(T5) model is based on transfer learning techniques for 
the NLP, it aims to explore what works best and how far can we push the tools we already 
have. 
This model generates a revised version of inputted text with the goal of containing a fewer 
grammatical error. It was trained with Happy Transformer* ( Happy Transformer is a package 
built on top of Hugging Face’s transformer library that makes it easy to utilize state-of-the-art 
NLP models.) using a dataset called JFLEG**. This model outperforms the human baseline 
on the General Language Understanding Evaluation (GLUE) benchmark- making it one of the 
most powerful NLP models in existence.

![T5 Model](https://1.bp.blogspot.com/-o4oiOExxq1s/Xk26XPC3haI/AAAAAAAAFU8/NBlvOWB84L0PTYy9TzZBaLf6fwPGJTR0QCLcBGAsYHQ/s640/image3.gif)

