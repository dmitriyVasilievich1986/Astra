from django.shortcuts import render


def main_view(request, *args, **kwargs):
    return render(request, "index.html")
