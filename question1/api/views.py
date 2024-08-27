from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from uuid import uuid4
BEARER_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQ0NjI2LCJpYXQiOjE3MjQ3NDQzMjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImU5ZjllNWVjLWM3MjYtNGJhYy05ODM0LTI0NDcyZjBiMGEwMSIsInN1YiI6IjIxZWcxMTJiNTFAYW51cmFnLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZG1lZCIsImNsaWVudElEIjoiZTlmOWU1ZWMtYzcyNi00YmFjLTk4MzQtMjQ0NzJmMGIwYTAxIiwiY2xpZW50U2VjcmV0IjoiaXRiem5aeWR3a3piTW9heCIsIm93bmVyTmFtZSI6IlBhdGhpbnRpIFZpbm9kIEt1bWFyIFJlZGR5Iiwib3duZXJFbWFpbCI6IjIxZWcxMTJiNTFAYW51cmFnLmVkdS5pbiIsInJvbGxObyI6IjIxZTExMmI1MSJ9.Yr8Z_Rn4sX52sB4uj2PXleynJWTsyIwBTV3-gsImv34"
BASE_URL = 'http://20.244.56.144/test/companies'
COMPANIES = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO']
product_cache={}
class ProductsView(APIView):
    def get(self,r,categoryname):
        n=int(r.GET.get('n',10))
        page=int(r.GET.get('page',1))
        sort_by=r.GET.get('sort_by')
        order=r.GET.get('order','asc')
        minPrice=r.GET.get('minPrice',1)
        maxPrice=r.GET.get('maxPrice',10000)
        products=[]
        for company in COMPANIES:
            res=requests.get(f'{BASE_URL}/{company}/categories/{categoryname}/products?top={n}&minPrice={minPrice}&maxPrice={maxPrice}',headers={'Authorization': f'Bearer {BEARER_TOKEN}'})
            products.extend(res.json())
        products = [{**product, 'id': str(uuid4())} for product in products]
        for product in products:
            product_cache[product['id']] = product
        if sort_by:
            products.sort(key=lambda x: x[sort_by], reverse=(order != 'asc'))
        start_index = (page - 1) * n
        paginated_products = products[start_index:start_index + n]
        return Response(paginated_products)
class ProductDetailsView(APIView):
    def get(self,r,categoryname,productid):
        product=product_cache[productid]
        if product:
            return Response(product)
        else:
            return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)