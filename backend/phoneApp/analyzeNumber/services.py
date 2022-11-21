import json
import phonenumbers
from phonenumbers import carrier, geocoder, timezone
from urlextract import URLExtract

class PhoneMessageDataAnalysisService(object):
    def analyze_phone(PhoneNumber):
        phone_object = dict()
        phone_object['country'] = ""
        phone_object['region'] = ""
        phone_object['operator'] = ""
        phone_object['matched_in_db'] = False
        #assumption that the prefix is the numbers that provide the country, region and provider data
        try:
            gb_number = phonenumbers.parse(PhoneNumber, None)
            #step1: validate phone number is valid
            if phonenumbers.is_possible_number(gb_number):
                rc = phonenumbers.geocoder.region_code_for_country_code(gb_number.country_code)
                phone_object['country'] = phonenumbers.geocoder.country_name_for_number(gb_number, "en");
                phone_object['region'] = geocoder.description_for_number(gb_number, "en")
                phone_object['operator'] = carrier.name_for_number(gb_number, "en")
                with open("./data.json") as file:
                    json_array = json.loads(file.read())
                
                list_of_countries = (o['country'] for o in json_array)
                unique_list_of_countries = (set(list_of_countries))
                
                def get_prefix(parsed_number):
                    international_f = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
                    num_array = international_f.split()
                    prefix = num_array[0][1:]
                    number_array = num_array[1].split('-')
                    if len(number_array) >= 2:
                        counter = 2
                    else:
                        counter = len(number_array)
                    for x in range(0, counter):
                        prefix = prefix + number_array[x]
                    return prefix
                
                if phone_object['country'] in unique_list_of_countries:
                    filtered = (p['prefix'] for p in json_array if p['country'] == phone_object['country'])
                    filtered_prefixes_by_country = [str(x) for x in filtered]
                    #sort array by length of prefix, this rendition runs in O(n*m)
                    sorted(filtered_prefixes_by_country, key=len)
                    counter = 0
                    matched = -1
                    #parse through sorted array and perform the matching, also O(n*m)
                    for c in filtered_prefixes_by_country:
                        current_prefix = filtered_prefixes_by_country[counter]
                        if len(current_prefix) > len(PhoneNumber):
                            break
                        elif current_prefix == PhoneNumber[1:len(current_prefix) + 1]:
                            matched = filtered_prefixes_by_country[counter]
                        counter+=1 
                    if matched != -1: #something matched
                        phone_object['prefix'] = matched
                        phone_object['matched_in_set'] = True
                    else: #if nothing matched, manually get the first 3 subset of the number
                        phone_object['prefix'] = get_prefix(gb_number)
                else:
                    phone_object['prefix'] = get_prefix(gb_number)
            else:
                raise ValueError('Invalid phone number')
        except ValueError as err:
            print(err.args)
        return phone_object
            
            
    def convert_message(original_message):
        extractor = URLExtract()
        counter = 0
        urls = extractor.find_urls(original_message)
        for m in urls:
            replacement_string = f'<a href=\'{m}\'>{m}</a>'
            original_message = original_message.replace(m, replacement_string)
            counter+=1
        return original_message
            
