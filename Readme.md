# Sign Language Detection and Text Conversion

A real-time sign language detection system that converts American Sign Language (ASL) gestures into text and speech. This application uses computer vision and deep learning to recognize hand gestures and convert them into readable text.

## Features

- Real-time hand gesture recognition
- Text conversion from ASL signs
- Text-to-speech functionality
- Word suggestions and auto-correction
- Interactive GUI interface
- Support for all ASL alphabets (A-Z)

## Prerequisites

- Python 3.7 or higher
- Webcam
- Required Python packages:
  ```
  opencv-python
  numpy
  tensorflow
  keras
  pyttsx3
  cvzone
  pyenchant
  Pillow
  ```

## Installation

1. Clone the repository:
```bash

```

2. Install required packages:
```bash
pip install -r requirements.txt
```

3. Download the model file:
- Place `cnn8grps_rad1_model.h5` in the project directory
- Place `white.jpg` (a white background image) in the project directory

## Usage

1. Run the application:
```bash
python final_pred.py
```

2. Using the application:
- Show your hand in front of the camera
- Make ASL signs for letters
- Use the "next" gesture to confirm a letter
- Use the "backspace" gesture to delete the last character
- Click "Speak" to hear the text
- Click "Clear" to reset the text

## Gesture Controls

- **Next**: Move your hand forward to confirm a letter
- **Backspace**: Move your hand backward to delete the last character
- **Space**: Show both hands to add a space
- **Clear**: Use the "Clear" button to reset the text

## Project Structure

```
sign-language-detection/
├── final_pred.py          # Main application file
├── cnn8grps_rad1_model.h5 # Trained model file
├── white.jpg             # Background image
└── requirements.txt      # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The model is trained on ASL alphabet dataset
- Uses OpenCV for computer vision
- Uses TensorFlow/Keras for deep learning
- Uses pyttsx3 for text-to-speech conversion 

🛠 Problem Statement
Communication barriers between the Deaf and Hard of Hearing (DHH) community and the hearing population create significant challenges in daily life. While sign language serves as a primary means of communication, a lack of widespread understanding among non-signers leads to difficulties in education, employment, healthcare, and social interactions.

Our project, Hastakshar, bridges this gap by translating sign language into text in real time, empowering accessibility and inclusion. Using OpenCV + MediaPipe, a pretrained & fine-tuned model, and Gemini API, Hastakshar enables seamless communication without requiring additional hardware or specialized training.

📊 Key Statistics (For Impact)
🔹 466 million people worldwide have disabling hearing loss (WHO, 2023).
🔹 By 2050, this number is expected to reach 900 million (WHO).
🔹 70 million+ people use sign language as their primary language globally.
🔹 In India, an estimated 6.3 crore (63 million) people experience significant hearing loss (The Lancet).
🔹 Despite this, Indian Sign Language (ISL) is not widely taught in schools, limiting accessibility.
🔹 Only 5% of deaf children receive education in sign language (World Federation of the Deaf).
🔹 Over 80% of the world’s deaf population lacks access to sign language interpreters.

Hastakshar aims to bridge this gap by providing a real-time sign-to-text translation tool, ensuring smoother communication and inclusivity.
