# require "rubygems"
# require "tmpdir"

# require "bundler/setup"
require "jekyll"


# Change your GitHub reponame eg. "kippt/jekyll-incorporated"
GITHUB_REPONAME = "kingscooty/kingscooty.github.io"


desc "Preview _site"
task :preview do
  puts "\n## Opening _site in browser"
  status = system("open http://0.0.0.0:4000/")
  puts status ? "Success" : "Failed"
end

namespace :site do
  desc "Generate blog files"
  task :generate do
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site"
    })).process
  end

  desc "Generate and publish blog to master"
  task :publish => [:generate] do
    Dir.mktmpdir do |tmp|
      puts "\n## Staging modified files"
      status = system("git add -A")
      puts status ? "Success" : "Failed"

      message = "Site updated at #{Time.now.utc}"
      status = system "git commit -m #{message.inspect}"
      puts = status ? "Successfully commited to local repo." : "Failed"

      status = system "git branch -D master"
      puts = status ? "Successfully deleted master." : "Failed deleting master."
      
      status = system "git checkout -b master"
      puts = status ? "Successfully checked out new master branch." : "Failed checking out new master"
      
      puts "Forcing subdir _site to be root dir..."
      status = system "git filter-branch --subdirectory-filter _site/ -f"
      puts = status ? "Success" : "Failed"

      puts "Removing .sass-cache"
      system "rm -r .sass-cache"

      system "git checkout source"
      
      puts = "Pushing to remote #{GITHUB_REPONAME}..."
      status = system "git push origin --all"
      
      puts = status ? "le BOOM! :)" : "le fail :/"
    end
  end
end