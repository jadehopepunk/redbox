# Install hook code here

require 'ftools'

redbox_dir = File.dirname(__FILE__)
root_dir = File.join(redbox_dir, '..', '..', '..')

File.copy File.join(redbox_dir, 'javascripts', 'redbox.js'), File.join(root_dir, 'public', 'javascripts', 'redbox.js')
File.copy File.join(redbox_dir, 'stylesheets', 'redbox.css'), File.join(root_dir, 'public', 'stylesheets', 'redbox.css')
File.copy File.join(redbox_dir, 'images', 'redbox_spinner.gif'), File.join(root_dir, 'public', 'images', 'redbox_spinner.gif')