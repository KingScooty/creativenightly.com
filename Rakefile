# require "rubygems"
# require "tmpdir"

# require "bundler/setup"
require "jekyll"


# Change your GitHub reponame eg. "kippt/jekyll-incorporated"
GITHUB_REPONAME = "kingscooty/kingscooty.github.io"


# namespace :site do
#   desc "Generate blog files"
#   task :generate do
#     Jekyll::Site.new(Jekyll.configuration({
#       "source"      => ".",
#       "destination" => "_site"
#     })).process
#   end


#   desc "Generate and publish blog to gh-pages"
#   task :publish => [:generate] do
#     Dir.mktmpdir do |tmp|
#       cp_r "_site/.", tmp
#       Dir.chdir tmp
#       system "git init"
#       system "git add ."
#       message = "Site updated at #{Time.now.utc}"
#       system "git commit -m #{message.inspect}"
#       system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
#       system "git push origin master:refs/heads/gh-pages --force"
#     end
#   end
# end

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
      system "git branch -D master"
      system "git push origin :master"
      system "git checkout -b master"
      puts "Regenerated master branch."
      puts "Forcing subdir _site to be root dir..."
      system "git filter-branch --subdirectory-filter _site/ -f"
      puts "Adding _site to master..."
      system "git add ."
      message = "Site updated at #{Time.now.utc}"
      puts = "Successfully added at #{Time.now.utc}."
      system "git commit -m #{message.inspect}"
      puts = "Successfully commited to local repo."
      puts = "Pushing to remote #{GITHUB_REPONAME}..."
      system "git push -u origin master"
      puts = "le BOOM! :)"
    end
  end
end