from django.urls import reverse_lazy
from django.views.generic.base import RedirectView
from django.views.generic.edit import CreateView
from django.contrib.auth import login, authenticate
from django.shortcuts import redirect
from django.http import HttpResponseRedirect

from .forms import CustomUserCreationForm

class SignUpView(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('home')
    template_name = 'registration/signup.html'


class HomeWithForm(CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('home')
    template_name = 'home.html'

    def form_valid(self, form):
        form.save()
        username = self.request.POST['username']
        password = self.request.POST['password1']
        user = authenticate(username=username, password=password)
        login(self.request, user)
        return redirect('home')
        

def SignIN(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request , user)

    return redirect('home')
