import requests
from bs4 import BeautifulSoup

def scrape_col3neg_video(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("සයිට් එකට ඇතුල් වෙන්න බැහැ!")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    # Data extraction (සයිට් එකේ HTML structure එක අනුව වෙනස් විය හැක)
    details = {
        "Title": soup.find('h1').text.strip() if soup.find('h1') else "N/A",
        "Thumbnail": soup.find('meta', property="og:image")['content'] if soup.find('meta', property="og:image") else "N/A",
        "Views": "Scrape from page element", # මෙතන views තියෙන HTML tag එක දාන්න
        "Duration": "Scrape from page element", # Duration එක තියෙන තැන
        "Info": soup.find('div', class_='video-details').text.strip() if soup.find('div', class_='video-details') else "No Info",
    }

    # Quality Links (මේක ගොඩක් වෙලාවට iframe එකක් ඇතුලේ තියෙන්නේ)
    # Download links වලට වෙනම logic එකක් ලියන්න වෙනවා
    qualities = ["360p", "480p", "720p", "1080p"]
    
    print("--- Video Details ---")
    for key, value in details.items():
        print(f"{key}: {value}")
        
    return details

# උදාහරණයක් ලෙස
# scrape_col3neg_video("https://col3neg.com/video-url-here")
