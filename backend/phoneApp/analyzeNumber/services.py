import json
from phonenumbers import phonenumbers, carrier, geocoder
import pycountry

#somewhere here I should check whether the number is an actual number before allowing
#phonenumbers to parse through it (will error out)
class PhoneMessageDataAnalysis(object):
    @staticmethod
    def analyze_phone(PhoneNumber):
        gb_number = phonenumbers.parse(PhoneNumber, None)
        country = pycountry.countries.get(alpha_2=region_code_for_number(gb_number)).name
        region = geocoder.description_for_number(gb_number)
        operator = carrier.name_for_number(gb_number, "en")
        prefix = ""
        json_array = json.loads("./data.json")

        list_of_countries = [dic['country'] for dic in json_array]
        unique_list_of_countries = list(set(list_of_countries))
        
        if country in unique_list_of_countries:
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
                prefix = get_prefix(gb_number)
        else:
            prefix = get_prefix(gb_number)
            
    def get_prefix(parsed_number):
        international_f = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
        number_array = international_f.split()
        return number_array[-2] #I am making the assumption that the second last set of numbers is the prefix (the last being the subscriber)
