import json
import phonenumbers
from phonenumbers import carrier, geocoder
import re

#somewhere here I should check whether the number is an actual number before allowing
#phonenumbers to parse through it (will error out)
class PhoneMessageDataAnalysis(object):
    def analyze_phone(PhoneNumber):
        phone_object = dict()
        #assumption that the prefix is the numbers that provide the country, region and provider data
        try:
            gb_number = phonenumbers.parse(PhoneNumber, None)
            #step1: validate phone number is valid
            if phonenumbers.is_possible_number(gb_number):
                rc = phonenumbers.geocoder.region_code_for_country_code(gb_number.country_code)
                phone_object['country'] = phonenumbers.geocoder._region_display_name(rc, lang)
                phone_object['region'] = geocoder.description_for_number(gb_number)
                phone_object['operator'] = carrier.name_for_number(gb_number, "en")
                json_array = json.loads("./data.json")

                list_of_countries = [dic['country'] for dic in json_array]
                unique_list_of_countries = list(set(list_of_countries))
                
                def get_prefix(parsed_number):
                    international_f = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
                    number_array = international_f.split()
                    prefix = number_array[0]
                    if number_array.len >= 3:
                        counter = 3
                    else:
                        counter = number_array.len
                    for x in range(1, counter):
                        prefix = prefix + number_array[x]
                    return prefix
                
                if phone_object['country'] in unique_list_of_countries:
                    filtered_prefixes_by_country = [p for p in json_array if p.country == country]
                    #sort array by length of prefix, this rendition runs in O(n*m)
                    #can be done in linear time, so rework this
                    sorted(filtered_prefixes_by_country, key=len)
                    counter = 0
                    matched
                    #parse through sorted array and perform the matching, also O(n*m)
                    for c in filtered_prefixes_by_country:
                        current_prefix = filtered_prefixes_by_country[counter]
                        if len(current_prefix) > len(PhoneNumber):
                            break
                        elif current_prefix == PhoneNumber[:current_prefix.len]:
                            matched = filtered_prefixes_by_country[counter]
                        counter+=1 
                    if matched.len > 1: #something matched
                        prefix = matched
                    else: #if nothing matched, get the second last string of the number
                        phone_object['prefix'] = get_prefix(gb_number)
                else:
                    phone_object['prefix'] = get_prefix(gb_number)
            else:
                raise ValueError('Invalid phone number')
        except ValueError as err:
            print(err.args)
        return phone_object
            
            
    def convert_message(original_message):
        for m in re.findall("\[.*?\]", s):
            replacement_string = '<a href=\''.join(m, '\'>', m, '</a>')
            original_message = original_message.replace(m, replacement_string)
        return original_message
            
