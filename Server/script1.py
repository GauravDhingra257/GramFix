from happytransformer import HappyTextToText
import sys
happy_tt = HappyTextToText(load_path="grammer")
from happytransformer import TTSettings
beam_settings =  TTSettings(num_beams=5, min_length=1, max_length=20)
Usrinput = "grammer: "+str(sys.argv[1])
output = happy_tt.generate_text(Usrinput, args=beam_settings)
print(output.text)